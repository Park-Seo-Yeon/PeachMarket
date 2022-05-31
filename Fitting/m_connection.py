# import module
from sre_constants import SUCCESS
import boto3
from werkzeug.utils import secure_filename
from m_config import AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY
from m_config import AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION
import numpy as np
import cv2

def s3_connection():
    '''
    s3 bucket에 연결
    :return: 연결된 s3 객체
    '''
    try:
        s3 = boto3.client(
                service_name='s3',
                region_name=AWS_S3_BUCKET_REGION,
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_ACCESS_KEY
            )
    except Exception as e:
        print(e)
        # exit(ERROR_S3_CONNECTION_FAILED)
    else:
        print("#############s3 bucket connected!")
        return s3

def s3_put_object(s3, bucket, filepath, access_key):
    '''
    s3 bucket에 지정 파일 업로드
    : s3: 연결된 s3 객체(boto3 client)
    : bucket: 버킷명
    : filepath: 파일 위치
    : access_key: 저장 파일명
    :return: 성공 시 True, 실패 시 False 반환
    '''
    try:
        s3.upload_file(filepath, bucket, access_key)
        print("######### upload model success !!")
    except Exception as e:
        print(e)
        return False
    return SUCCESS
    
def s3_get_object(s3, bucket, object_name, file_name):
    '''
    s3 bucket에서 지정 파일 다운로드
    : s3: 연결된 s3 객체(boto3 client)
    : bucket: 버킷명
    : object_name: s3에 저장된 object 명
    : file_name: 저장할 파일 명(path)
    :return: 성공 시 True, 실패 시 False 반환
    '''
    try:
        s3.download_file(bucket, object_name, file_name)
        
    except Exception as e:
        print("#####################", e)
        return False
    return True

# # 로컬에 파일을 저장하지 않고 읽어만 온다.
# def read_image(filename):
#     s3 = s3_connection()
#     file_stream = s3.get_object(Bucket=AWS_S3_BUCKET_NAME, Key=filename)['Body'].read()
#     img = np.fromstring(file_stream, dtype=np.uint8)
#     img = cv2.imdecode(img, cv2.IMREAD_COLOR)
#     return img

