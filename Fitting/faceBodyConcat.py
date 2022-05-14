from cmath import rect
from turtle import shape
from cv2 import IMREAD_COLOR
from imutils import face_utils
import numpy as np
import imutils
import dlib
import cv2
from rembg import remove
from PIL import Image, ImageEnhance

#----------------------------------------------------------------------------------------------------
#이미지 블러 처리
def imageBlur(img, left, right, top, bottom):
    ksize = 5        # 블러 처리에 사용할 커널 크기. 블러 강함 정도.
    righttIndex = 28
    leftIndex = 20

    #턱 부분 가운데 제외한 양 옆을 흐리게.
    roi = img[top:bottom, left+leftIndex:left+righttIndex]   # 관심영역 지정
    roi = cv2.blur(roi, (ksize, ksize)) # 블러(모자이크) 처리
    img[top:bottom, left+leftIndex:left+righttIndex] = roi   # 원본 이미지에 적용

    roi = img[top:bottom, right-righttIndex:right-leftIndex]   
    roi = cv2.blur(roi, (ksize, ksize)) 
    img[top:bottom, right-righttIndex:right-leftIndex] = roi   

    return img

#----------------------------------------------------------------------------------------------------
#이미지 밝기 조절
def imageBright(input_path, output_path):
    image = cv2.imread(input_path, cv2.IMREAD_COLOR)
    val = 15
    array = np.full(image.shape, (val, val, val), dtype=np.uint8)

    cv2.imshow("before bright", image)
    image = cv2.add(image, array)
    cv2.imshow("after bright", image)
    
    cv2.imwrite(output_path, image)

#----------------------------------------------------------------------------------------------------
#배경 제거
def removeBackground(cropped_image, output_path):
    with open(cropped_image, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)


#----------------------------------------------------------------------------------------------------
#사진에서 얼굴 가로, 세로 크기 추출
def faceSize(input_path):
    input_image = cv2.imread(input_path)

    gray = cv2.cvtColor(input_image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray, 1) 

    for(i, face) in enumerate(faces):
         #얼굴 랜드마크 찾아주고 각 좌표를 (x, y) numpy로 반환
        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)
       
        (x,y,w,h) = face_utils.rect_to_bb(face)
        print("x : {}, y : {}, x+w : {}, y+h : {}, width : {}, height : {}".format(x,y,x+w,y+h, w, h))

        leftIndex = np.min(shape, axis=0)[0] 
        topIndex = np.min(shape, axis=0)[1] 
        rightIndex = np.max(shape, axis=0)[0] 
        bottomIndex = np.max(shape, axis=0)[1]

        width = rightIndex - leftIndex
        height = bottomIndex - topIndex

        cv2.rectangle(input_image, (leftIndex, topIndex), (rightIndex, bottomIndex), (0,255,0), 1)

        print("Body Image Face : widthIndex : {}, heightIndex : {}".format(width, height))
        
    return width, height


#----------------------------------------------------------------------------------------------------
#얼굴 및 랜드마크 인식
def show_raw_detection(input_face_path, cropped_face_path, output_face_path, detector, predictor):
    input_face_image = cv2.imread(input_face_path)

    input_face_image = imutils.resize(input_face_image, width=300)

    gray = cv2.cvtColor(input_face_image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray, 1) #얼굴 찾아줌

    ''' 
    #얼굴 박스 좌표 반환
    left = faces.left()
    top = faces.top()
    bottom = faces.bottom()
    right = faces.right()
    '''

    #i : index / rect : value
    for(i, face) in enumerate(faces):

         #얼굴 랜드마크 찾아주고 각 좌표를 (x, y) numpy로 반환
        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)
       
        (x,y,w,h) = face_utils.rect_to_bb(face)

        #아래 (x,y,w,h)
        leftIndex = np.min(shape, axis=0)[0] - 40 # 30
        topIndex = 0    #np.min(shape, axis=0)[1] - 100
        rightIndex = np.max(shape, axis=0)[0] + 40 # 30
        bottomIndex = np.max(shape, axis=0)[1]

        crop = input_face_image[topIndex:bottomIndex, leftIndex:rightIndex]
        cv2.imwrite(cropped_face_path, crop)

        '''
        j=0
        #랜드마크를 빨간 점으로 찍어서 표현
        for (x,y) in shape:
            cv2.putText(input_face_image, "{}".format(j+1), (x,y), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 0), 1)
            j+=1
        '''
        
    removeBackground(cropped_face_path, output_face_path)
    output_face_image = cv2.imread(output_face_path)
    output_face_image = imutils.resize(output_face_image, width=55)

    height, width, c = output_face_image.shape
    print("output_image shape : width {}, height {}".format(width, height))
    cv2.imwrite(output_face_path, output_face_image)

    #cv2.imshow("Output", output_image)
    #cv2.waitKey(0)

#----------------------------------------------------------------------------------------------------
#얼굴과 몸 합성
def concatFaceBody(face_path, body_path, output_path, detector):
    face_image = cv2.imread(face_path)
    body_image = cv2.imread(body_path)

    #body_image 밝게. 얼굴과 톤 맞추기 위함.
    #imageBright(body_path, body_path)

    gray = cv2.cvtColor(body_image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray, 1) 

    gray2 = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
    faces2 = detector(gray2, 1) 

    for(i, face) in enumerate(faces):
         #얼굴 랜드마크 찾아주고 각 좌표를 (x, y) numpy로 반환
        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)
       
        (x,y,w,h) = face_utils.rect_to_bb(face)
        print("x : {}, y : {}, x+w : {}, y+h : {}, width : {}, height : {}".format(x,y,x+w,y+h, w, h))

        leftIndex = np.min(shape, axis=0)[0] 
        topIndex = np.min(shape, axis=0)[1] 
        rightIndex = np.max(shape, axis=0)[0] 
        bottomIndex = np.max(shape, axis=0)[1]

        #cv2.rectangle(body_image, (leftIndex, topIndex), (rightIndex, bottomIndex), (0,255,0), 1)

        #print("leftIndex : {}, topIndex : {}, rightIndex : {}, bottomIndex : {}".format(leftIndex, topIndex, rightIndex, bottomIndex))

        print("Body Image Face : widthIndex : {}, heightIndex : {}".format(rightIndex-leftIndex, bottomIndex-topIndex))

        height, width, chennel = face_image.shape
        height2, width2, chennel = body_image.shape
        print("Face : width : {}, height : {}".format(width, height)) 
        #print("width2 : {}, height2 : {}".format(width2, height2)) 

        body_image[0:topIndex, leftIndex:rightIndex] = 0

        #body_image[topIndex:bottomIndex, leftIndex-3:rightIndex-3] = face_image[0:height, 0:width]
        #body_image[0:topIndex, leftIndex:rightIndex+5] = 0
        #body_image = imageBlur(body_image, leftIndex-3, rightIndex-3, bottomIndex-3, bottomIndex+3)
        body_image[topIndex-12:bottomIndex, leftIndex:rightIndex] = face_image[0:height, 0:width]

    
    cv2.imwrite("temp.png", body_image)
    removeBackground("temp.png", output_path)
    cv2.imshow("NEW", body_image)
    cv2.waitKey(0)



#----------------------------------------------------------------------------------------------------
#얼굴 검출
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

input_face_path = "jin.png"
cropped_path = "jinCrop.png"
output_face_path = "jinOutput.png"

input_body_path = 'man17576.png'
output_concat_path = "man17576Fitting.png"

#cutOnlyBody(detector, predictor, "man.png", "manBodyCut.png")
show_raw_detection(input_face_path, cropped_path, output_face_path, detector, predictor) #전체 얼굴 랜드마크 추출
#draw_indivisual_detections(image, detector, predictor) #부위별 랜드마크 추출
#removeBackground("manBody.png", "man.png")
concatFaceBody(output_face_path, input_body_path, output_concat_path, detector)

