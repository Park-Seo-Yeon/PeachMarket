from operator import ge
import cv2
from PIL import Image, ImageOps
from matplotlib.pyplot import axis
from parso import parse
from rembg import remove
import numpy as np

from imutils import face_utils
import imutils
import dlib
import scipy.ndimage as sm

from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME

s3 = s3_connection()

#----------------------------------------------------------------------------------------------------
# 기본 모델 선택
def selectOriginalModelImage(gender, weight, height):
    if gender == "m":
        if height<171:
            if weight<73: model = "man16870"
            elif weight<78:model = "man16875"
            elif weight<83:model = "man16880"
            else: model = "man16885"
        elif height<176:
            if weight<=73:model = "man17370"
            elif weight<78:model = "man17375"
            elif weight<83:model = "man17380"
            else:model = "man17385"
        elif height<181:
            if weight<=73:model = "man17870"
            elif weight<78:model = "man17875"
            elif weight<83:model = "man17880"
            else:model = "man17885"
        else:
            if weight<=73:model = "man18370"
            elif weight<78:model = "man18375"
            elif weight<83:model = "man18380"
            else:model = "man18385" 

    else:
        if height<158:
            if weight<56:model = "woman15553"
            elif  weight<61:model = "woman15558"
            elif weight<65:model = "woman15563"
            else:model = "woman15568"
        elif height<163:
            if weight<56:model = "woman16053"
            elif weight<61:model = "woman16058"
            elif weight<65:model = "woman16063"
            else:model = "woman16068"
        elif height<168:
            if weight<56:model = "woman16553"
            elif weight<61:model = "woman16558"
            elif weight<65:model = "woman16563"
            else:model = "woman16568"
        else:
            if weight<56:model = "woman17053"
            elif weight<61:model = "woman17058"
            elif weight<65:model = "woman17063"
            else:model = "woman17068"
    return model


#----------------------------------------------------------------------------------------------------
#개인 모델 생성
def createModel(id, gender, weight, height, selca):
    # 얼굴을 합성하기 위한 기본 모델을 성별, 몸무게, 키 정보로 가져온다.

    originModel = selectOriginalModelImage(gender, weight, height)

    # class 'werkzeug.datastructures.FileStorage' -> cv2
    selca = np.fromfile(selca, np.uint8)
    selca = cv2.imdecode(selca, cv2.IMREAD_COLOR)

    selca_path = ("data/face/{}.jpg").format(id)
    cv2.imwrite(selca_path, selca)

    input_body_path = ("data/origin_image/{}.jpg").format(originModel)
    s3_get_object(s3, AWS_S3_BUCKET_NAME, input_body_path, input_body_path)
   
    model_path = faceBodyComposite(selca_path, input_body_path, id) 

    if model_path is not False : 
        return model_path
    else:
        return False


#----------------------------------------------------------------------------------------------------
#셀카와 원본 모델을 합성하여 개인 모델 생성
def faceBodyComposite(selca_path, input_body_path, id):
    try:
        selca_face, _ = face_crop(selca_path, "selca")
        _, body_index = face_crop(input_body_path, "model")
    except:
        return False

    body_width = body_index[3]-body_index[2] 
    face_resized = imutils.resize(selca_face, width = body_width)
    output_face_image = remove(face_resized)

    # Output Image의 png 파일을 jpg로 변환하는 경우 검정색으로 바뀌는 배경을 하얀색으로 변경.
    output_face_image = Image.fromarray(output_face_image)
    marged_im = Image.new('RGB', output_face_image.size, (255,255,255))
    marged_im.paste(output_face_image, mask=output_face_image.split()[3])
    

    body_index_height = body_index[1] - body_index[0]
    if marged_im.size[1] - body_index_height > 0: # 얼굴사진 높이가 더 크면

        body_index[1] = body_index[1] + (marged_im.size[1] - body_index_height)

    elif marged_im.size[1] - body_index_height < 0: # 몸사진 높이가 더 크면
        body_index[0] = body_index[0] + (body_index_height - marged_im.size[1])

        
    body = cv2.imread(input_body_path, cv2.IMREAD_COLOR)
    height_index = 4
    weight_index = 2

    a = body_index[0]+height_index
    b = body_index[1]+height_index
    c = body_index[2]+weight_index
    d = body_index[3]+weight_index

    body[a:b, c:d] = marged_im
    marged_im = np.array(marged_im)

    model_path = ("data/image/{}.jpg").format(id)
    cv2.imwrite(model_path, body)

    save_url = ("data/image-mask/{}.png").format(id)
    binaryMarking(model_path, save_url)

    # Amazon s3에 개인 모델 사진 저장
    try :
        s3_put_object(s3, AWS_S3_BUCKET_NAME, model_path, model_path)
        return model_path
    except Exception as E :
        print(E)
        return False


#----------------------------------------------------------------------------------------------------
#얼굴 추출
def face_crop(input_face_path, type):
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

    input_face_image = cv2.imread(input_face_path, cv2.IMREAD_COLOR)

    if type == "selca":
        input_face_image = imutils.resize(input_face_image, width=300)
        
    gray = cv2.cvtColor(input_face_image, cv2.COLOR_BGR2GRAY)

    try:
        faces = detector(gray, 1) #사진에서 얼굴을 찾아준다.
    except:
        return False, False

    #i : index / face : value
    for(i, face) in enumerate(faces):
         #얼굴 랜드마크 찾아주고 각 좌표를 (x, y) numpy로 반환
        try:
            shape = predictor(gray, face)
            shape = face_utils.shape_to_np(shape)
        except:
            return False, False
        (x,y,w,h) = face_utils.rect_to_bb(face)

        #얼굴 crop
        leftIndex = np.min(shape, axis=0)[0] - int(w/2)
        topIndex = np.min(shape, axis=0)[1] - int(h/1.3)
        rightIndex = np.max(shape, axis=0)[0] + int(w/2)
        bottomIndex = np.max(shape, axis=0)[1]

        if topIndex < 0:
            bottomIndex -= topIndex
            topIndex = 0
        if leftIndex < 0:
            rightIndex -= leftIndex
            leftIndex = 0

        index = [topIndex, bottomIndex, leftIndex, rightIndex]
        crop_face = input_face_image[index[0]:index[1], index[2]:index[3]]

        return crop_face, index


def doFitting(id, cloth, extension):
    global s3
    s3_get_name = ("data/origin_cloth/{}.{}").format(cloth, extension)
    s3_get_object(s3, AWS_S3_BUCKET_NAME, s3_get_name, s3_get_name)

    save_url = "data/cloth/"

    try:
        clothResizeRembg(s3_get_name, save_url, cloth)
        setParsingPath(id)
        setFittingPath(id, cloth)
        return True
    except Exception as E:
        print(E)
        return False


#----------------------------------------------------------------------------------------------------
#옷 전처리
def clothResizeRembg(origin_url, save_url, cloth): 
    # Cloth Image resize(width = 192px, height = 256px)
    # binary-marking까지는 png로 하고 완료된 이후에 원본 옷 파일을 png->jpg 변환
    img = Image.open(origin_url)

    # 세로가 회전되는 경우 문제 해결. img.size() 함수의 EXIF 태그에 있는 회전 정보 반영.
    img = ImageOps.exif_transpose(img) 
    
    width = 192
    width_ratio = width/float(img.size[0])
    height = int((float(img.size[1]) * float(width_ratio)))
    resize_img = img.resize((int(width), height), Image.ANTIALIAS)

    # Cloth Image Remove Background
    output = remove(resize_img)

    marged_im = Image.new('RGB', output.size, (255,255,255))
    marged_im.paste(output, mask=output.split()[3])

    zeros = cv2.imread("zeros.png", cv2.IMREAD_COLOR)
    zeros[int(zeros.shape[0]/2-resize_img.size[1]/2):int(zeros.shape[0]/2+resize_img.size[1]/2), 0:zeros.shape[1]] = np.array(marged_im)
    zeros = cv2.cvtColor(zeros, cv2.COLOR_BGR2RGB)
    
    save_cloth_path = ("{}{}.jpg").format(save_url, cloth)

    cv2.imwrite(save_cloth_path, zeros)

    global s3    
    s3_put_object(s3, AWS_S3_BUCKET_NAME, save_cloth_path, save_cloth_path)

    save_url = ("data/cloth-mask/{}.jpg").format(cloth)
    binaryMarking(save_cloth_path, save_url)


#----------------------------------------------------------------------------------------------------
#mask 이진화
def binaryMarking(image_url, save_url):
    src = cv2.imread(image_url, cv2.IMREAD_GRAYSCALE)
    _, th = cv2.threshold(src, 240, 255, cv2.THRESH_BINARY_INV)
    th = sm.binary_fill_holes(th)
    
    th = Image.fromarray(th)
    th.save(save_url)


#----------------------------------------------------------------------------------------------------
#LIP_JPPNet에서 parsing 할 이미지 이름과 성별을 텍스트 파일에 기록
def setParsingPath(id):
    set_parsing_path = "data/LIP_JPPNet_pose/val.txt"
    with open(set_parsing_path, 'w') as file:
        file.seek(0)
        file.write(id+".jpg")
        file.truncate()


#----------------------------------------------------------------------------------------------------
#가상 피팅 할 모델 사진과 옷 사진을 텍스트 파일에 기록
def setFittingPath(id, cloth):
    set_fitting_path = "data/test_pairs.txt"
    with open(set_fitting_path, 'w') as file:
        file.seek(0)
        file.write(id + ".jpg " + cloth + ".jpg")
        file.truncate()

#----------------------------------------------------------------------------------------------------
#가상 피팅된 모델을 배경 제거 후 프론트로 리턴
def removeBackground(id):
    try_on_path = "data/result/TOM/try-on/{}.jpg".format(id)
    fitting = cv2.imread(try_on_path, cv2.IMREAD_COLOR)
    fitting = remove(fitting)
    cv2.imwrite(try_on_path.format(id), fitting)
    s3_put_object(s3, AWS_S3_BUCKET_NAME, try_on_path, "data/result/TOM/try_on/{}.jpg".format(id))
    print("##### 모델 생성 후 배경 제거 완료")
