from tkinter import E, Canvas
from warnings import catch_warnings
import cv2
from PIL import Image
from rembg import remove
import numpy as np

from PIL import Image, ImageEnhance, ImageFilter
from imutils import face_utils
import imutils
import dlib
from cmath import rect
from turtle import shape

import pandas as pd

from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME



'''
#192x256px 하얀 이미지 생성
zeros = np.full((256, 192), 255, dtype=np.uint8)
cv2.imwrite("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/cloth/zeros.png", zeros)
zero = Image.open("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/cloth/zeros.png").convert('RGB')
zero.save("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/cloth/zeros.png")
'''

#----------------------------------------------------------------------------------------------------
#배경 제거
def removeBackground(cropped_image, output_path):
    with open(cropped_image, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)

#----------------------------------------------------------------------------------------------------
#개인 모델 생성
def createModel(id, gender, weight, height, s3):
    #gender, id, weight, height = makePersonalModel()
    originModel = selectOriginalModelImage(gender, weight, height)
    
    # Amazon s3에서 셀카 가져오기
    # s3 = s3_connection()
    s3_get_name = 'selca/' + id + '.jpg'
    save_face_name = 'data/face/' + id + '.jpg'
    s3_get_object(s3, AWS_S3_BUCKET_NAME, s3_get_name, save_face_name)
    
    # 개인 모델 생성
    # input_face_path = "data/face/" + id + ".jpg"
    input_body_path = "data/origin_image/" + originModel + ".jpg"
    output_model_path = "data/image/" + id + ".jpg"
    model = faceBodyComposite(save_face_name, input_body_path, output_model_path, id)
    
    # Amazon s3에 개인 모델 사진 저장
    s3_save_model_name = "model/" + id + ".jpg"
    try :
        s3_put_object(s3, AWS_S3_BUCKET_NAME, output_model_path, s3_save_model_name)
        print("######### s3 save model image success !! #########")
        # return True
        return model
    except Exception as E :
        print("######### s3 save model image error message #########")
        print(E)
        return False
    
   
    



#----------------------------------------------------------------------------------------------------
# Spring boot에서 받아오는 cloth s3 경로명, 유저 id
# Amazon s3와 연결해서 이미지 받아오기
def makePersonalModel():
    cloth_path = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/origin_cloth/cloth6.png"
    if cloth_path[-3:] == "png":
        cloth_path = cloth_path.replace('png', 'jpg')
    
    gender = 1
    id = "jin"
    weight = 75
    height = 173
    return gender, id, weight, height


#----------------------------------------------------------------------------------------------------
# 기본 모델 선택
def selectOriginalModelImage(sex, weight, height):
    if sex == 1:
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

    if sex == 2:
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
            if weight<56:model = "woman16853"
            elif weight<61:model = "woman16858"
            elif weight<65:model = "woman16863"
            else:model = "woman16868"
    return model


#----------------------------------------------------------------------------------------------------
#셀카와 원본 모델을 합성하여 개인 모델 생성
def faceBodyComposite(input_face_path, input_body_path, output_model_path, id):
    selca_face, face_index = face_crop(input_face_path, "selca")
    body_face, body_index = face_crop(input_body_path, "model")
    body_image = cv2.imread(input_body_path)

    body_width = body_index[3]-body_index[2]
    output_face_image = imutils.resize(selca_face, width = body_width)
    
    output_face_image = remove(output_face_image)

    output_face_image = Image.fromarray(output_face_image)
    # Output Image의 png 파일을 jpg로 변환하는 경우 검정색으로 바뀌는 배경을 하얀색으로.
    marged_im = Image.new('RGB', output_face_image.size, (255,255,255))
    marged_im.paste(output_face_image, mask=output_face_image.split()[3])

    body_index_height = body_index[1] - body_index[0]
    if marged_im.size[1] - body_index_height > 0:
        body_index[0] = body_index[0] + (marged_im.size[1] - body_index_height)
    else:
        body_index[0] = body_index[0] - (marged_im.size[1] - body_index_height)

    print("body index : ", body_index[1] - body_index[0])
    print("marged_im height : ", marged_im.size[1])

    height_index = 4
    weight_index = 2
    body_image[body_index[0]+height_index:body_index[1]+height_index, body_index[2]+weight_index:body_index[3]+weight_index] = 0
    body_image[body_index[0]+height_index:body_index[1]+height_index, body_index[2]+weight_index:body_index[3]+weight_index] = marged_im

    cv2.imwrite(output_model_path, body_image)

    image_url = output_model_path
    save_url = "data/image-mask/"+ id +".png"
    binaryMarking(image_url, save_url)

    # return body_image
    return True

#----------------------------------------------------------------------------------------------------
#얼굴 추출
def face_crop(input_face_path, type):
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
    
    input_face_image = cv2.imread(input_face_path)
    
    if type == "selca":
        input_face_image = imutils.resize(input_face_image, width=300)

    gray = cv2.cvtColor(input_face_image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray, 1) #얼굴 찾아줌

    #i : index / rect : value
    for(i, face) in enumerate(faces):

         #얼굴 랜드마크 찾아주고 각 좌표를 (x, y) numpy로 반환
        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)
       
        (x,y,w,h) = face_utils.rect_to_bb(face)

        #얼굴 crop
        leftIndex = np.min(shape, axis=0)[0] - int(w/2)
        topIndex = np.min(shape, axis=0)[1] - int(h/1.3)
        rightIndex = np.max(shape, axis=0)[0] + int(w/2)
        bottomIndex = np.max(shape, axis=0)[1]

        index = [topIndex, bottomIndex, leftIndex, rightIndex]
        crop_face = input_face_image[topIndex:bottomIndex, leftIndex:rightIndex]
    return crop_face, index


def doFitting(id, cloth, gender):
    origin_url = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/origin_cloth/"
    save_url = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/cloth/"
    #id, cloth, gender = fitting()
    clothResizeRembg(origin_url, save_url, cloth)
    setParsingPath(id, gender)
    setFittingPath(id, cloth)
    return "done do fitting"


#----------------------------------------------------------------------------------------------------
#옷 전처리
def clothResizeRembg(origin_url, save_url, cloth): 
    # Cloth Image resize(width = 192px, height = 256px)
    # binary-marking까지는 png로 하고 완료된 이후에 원본 옷 파일을 png->jpg 변환
    img = Image.open(origin_url + cloth + ".jpg")
    width = 192
    width_ratio = width/float(img.size[0])
    height = int((float(img.size[1]) * float(width_ratio)))
    resize_img = img.resize((int(width), height), Image.ANTIALIAS)

    # Cloth Image Remove Background
    output = remove(resize_img)
    marged_im = Image.new('RGB', output.size, (255,255,255))
    marged_im.paste(output, mask=output.split()[3])

    zeros = cv2.imread("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/zeros.png", cv2.IMREAD_COLOR)
    zeros[int(zeros.shape[0]/2-resize_img.size[1]/2):int(zeros.shape[0]/2+resize_img.size[1]/2), 0:zeros.shape[1]] = np.array(marged_im)
    zeros = cv2.cvtColor(zeros, cv2.COLOR_BGR2RGB)
    cv2.imwrite(save_url + cloth + ".jpg", zeros)

    image_url = save_url + cloth + ".jpg"
    save_url = "data/cloth-mask/"+ cloth +".jpg"
    binaryMarking(image_url, save_url)


#----------------------------------------------------------------------------------------------------
#mask 이진화
def binaryMarking(image_url, save_url):
    src = cv2.imread(image_url, 0)
    ret,th = cv2.threshold(src, 251, 255,cv2.THRESH_BINARY_INV)
    cv2.imwrite(save_url, th)


#----------------------------------------------------------------------------------------------------
#LIP_JPPNet에서 parsing 할 이미지 이름과 성별을 텍스트 파일에 기록
def setParsingPath(id, gender):
    with open("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/LIP_JPPNet_pose/val.txt", 'w') as file:
        file.seek(0)
        file.write(id+".jpg " + str(gender))
        file.truncate()

#----------------------------------------------------------------------------------------------------
#가상 피팅 할 모델 사진과 옷 사진을 텍스트 파일에 기록
def setFittingPath(id, cloth):
    with open("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/test_pairs.txt", 'w') as file:
        file.seek(0)
        file.write(id + ".jpg " + cloth + ".jpg")
        file.truncate()




def fitting():
    id = "jin"
    cloth = "cloth5"
    gender = 2
    return id, cloth, gender

def resize192x256():
    image = Image.open("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/origin_image/woman16058.jpg")
    image = image.resize({192,256})
    image.save("C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/origin_image/woman16058-resize.jpg")

#def main():
    # 마이페이지에서 모델 생성 버튼 눌렀을 때 호출 할 함수
    # gender, id, weight, height = makePersonalModel()
    # createModel(id, gender, weight, height)

    # # 게시글에서 "피팅" 버튼 클릭 시 실행 할 함수
    # id, cloth = fitting()
    # origin_url = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/origin_cloth/"
    # save_url = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/cloth/"
    # clothResizeRembg(origin_url, save_url, cloth)
    # setParsingPath(id, gender)
    # setFittingPath(id, cloth)


    #resize192x256()
    

# if __name__ == "__main__":
#     main()