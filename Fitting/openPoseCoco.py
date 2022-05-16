import cv2
import json
from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME

def output_keypoints(frame, proto_file, weights_file, threshold, model_name, BODY_PARTS, img_id, gender):
    global points

    # 네트워크 불러오기
    net = cv2.dnn.readNetFromCaffe(proto_file, weights_file)
    # 입력 이미지의 사이즈 정의
    image_height = 368 #256
    image_width = 368 #192

    # 네트워크에 넣기 위한 전처리
    input_blob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (image_width, image_height), (0, 0, 0), swapRB=False, crop=False)

    # 전처리된 blob 네트워크에 입력
    net.setInput(input_blob)

    # 결과 받아오기
    out = net.forward()
    #print(len(out))
    # The output is a 4D matrix :
    # The first dimension being the image ID ( in case you pass more than one image to the network ).
    # The second dimension indicates the index of a keypoint.
    # The model produces Confidence Maps and Part Affinity maps which are all concatenated.
    # For COCO model it consists of 57 parts – 18 keypoint confidence Maps + 1 background + 19*2 Part Affinity Maps. Similarly, for MPI, it produces 44 points.
    # We will be using only the first few points which correspond to Keypoints.
    # The third dimension is the height of the output map.
    out_height = out.shape[2]
    # The fourth dimension is the width of the output map.
    out_width = out.shape[3]

    print("out_height : ", out_height)
    print("out_width : ", out_width)


    # 원본 이미지의 높이, 너비를 받아오기
    frame_height, frame_width = frame.shape[:2]

    print("frame_height : ", frame_height)
    print("frame_width : ", frame_width)

    # 포인트 리스트 초기화
    points = []

    print(f"\n============================== {model_name} Model ==============================")
    for i in range(len(BODY_PARTS)):

        # 신체 부위의 confidence map
        #Confidence Map은 특정 신체부위가 위치할 가능성에 따라 높은 값(최저 0 ~ 최고 1)을 갖는 흑백 이미지
        prob_map = out[0, i, :, :]

        # 최소값, 최대값, 최소값 위치, 최대값 위치
        min_val, prob, min_loc, point = cv2.minMaxLoc(prob_map)

       

        # 원본 이미지에 맞게 포인트 위치 조정
        x1 = (frame_width * point[0]) / out_width
        x = int(x1)
        y1 = (frame_height * point[1]) / out_height

        # if gender == "2":
        #     if i==2:
        #         y1 = (frame_height * point[1]) / out_height - 5
        #         two_y = y1
        #     elif i==5:
        #         y1 = two_y
            
        if gender == "1" :
            if i==8 or i==11:
                y1 += 15
        y = int(y1)    
        

        if prob > threshold:  # [pointed]
            cv2.circle(frame, (x, y), 2, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            cv2.putText(frame, str(i), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1, lineType=cv2.LINE_AA)

            #points.append((x1, y1, prob))
            points.append(x1)
            points.append(y1)
            points.append(prob)
            
            print(f"[pointed] {BODY_PARTS[i]} ({i}) => x: {x1} / y: {y1} / prob: {prob:.5f}")

        else:  # [not pointed]
            #cv2.circle(frame, (x, y), 2, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            #cv2.putText(frame, str(i), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 1, lineType=cv2.LINE_AA)

            points.append(0)
            points.append(0)
            points.append(0)
            #print(f"[not pointed] {BODY_PARTS[i]} ({i}) => prob: {prob:.5f} / x: {x1} / y: {y1}")
       
    print(len(points))
    json_data = {"version": 1.0, "people": [
                {"face_keypoints": [],
                "pose_keypoints":points,
                "hand_right_keypoints": [], 
                "hand_left_keypoints": []
            }]}

    save_keypoints_path = "data/pose/" + img_id + "_keypoints.json"
    with open(save_keypoints_path, 'w') as outfile:
        json.dump(json_data, outfile)

    s3 = s3_connection()
    s3_put_object(s3, AWS_S3_BUCKET_NAME, save_keypoints_path, save_keypoints_path)
    
    # print(json_data)
    # cv2.imshow("Output_Keypoints", frame)
    # cv2.waitKey(0)
    return frame


def output_keypoints_with_lines(frame, POSE_PAIRS):
    print()
    for pair in POSE_PAIRS:
        part_a = pair[0]  # 0 (Head)
        part_b = pair[1]  # 1 (Neck)
        if points[part_a] and points[part_b]:
            print(f"[linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
            cv2.line(frame, points[part_a], points[part_b], (0, 255, 0), 1)
        else:
            print(f"[not linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")

    cv2.imshow("output_keypoints_with_lines", frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()



def main():
    BODY_PARTS_COCO = {0: "Nose", 1: "Neck", 2: "RShoulder", 3: "RElbow", 4: "RWrist",
                   5: "LShoulder", 6: "LElbow", 7: "LWrist", 8: "RHip", 9: "RKnee",
                   10: "RAnkle", 11: "LHip", 12: "LKnee", 13: "LAnkle", 14: "REye",
                   15: "LEye", 16: "REar", 17: "LEar"}#, 18: "Background"}

    POSE_PAIRS_COCO = [[0, 1], [0, 14], [0, 15], [1, 2], [1, 5], [1, 8], [1, 11], [2, 3], [3, 4],
                    [5, 6], [6, 7], [8, 9], [9, 10], [12, 13], [11, 12], [14, 16], [15, 17]]


    # 신경 네트워크의 구조를 지정하는 prototxt 파일 (다양한 계층이 배열되는 방법 등)
    protoFile_coco = "openpose/models/pose/coco/pose_deploy_linevec.prototxt"
#C:/Users/suhyunPeachMarket/Fitting/
    # 훈련된 모델의 weight 를 저장하는 caffemodel 파일
    weightsFile_coco = "openpose/models/pose/coco/pose_iter_440000.caffemodel"

    file = open("data/LIP_JPPNet_pose/val.txt", 'r') 
    image_path = file.readline().strip()
    img_id = image_path.split()[0].split(".")[0]
    gender = image_path.split()[1]

    print("#########img id : ", img_id)
    print("######### gener : ", gender)

    # 이미지 경로
    image = "./data/image/" + img_id + ".jpg"
    # 키포인트를 저장할 빈 리스트
    points = []

    # 이미지 읽어오기
    frame_coco = cv2.imread(image)


    # COCO Model
    frame_COCO = output_keypoints(frame=frame_coco, proto_file=protoFile_coco, weights_file=weightsFile_coco,
                                threshold=0.1, model_name="COCO", BODY_PARTS=BODY_PARTS_COCO, img_id = img_id, gender = gender)
    #output_keypoints_with_lines(frame=frame_COCO, POSE_PAIRS=POSE_PAIRS_COCO)


if __name__ == "__main__":
    main()