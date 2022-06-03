from sre_constants import SUCCESS
import boto3
from werkzeug.utils import secure_filename
from m_config import AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY
from m_config import AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION
import numpy as np
import cv2

# s3 bucket에 연결. 연결된 s3 객체를 return.
def s3_connection():
    try:
        s3 = boto3.client(
                service_name='s3',
                region_name=AWS_S3_BUCKET_REGION,
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_ACCESS_KEY
            )
    except Exception as e:
        print(e)
    else:
        print("#############s3 bucket connected!")
        return s3


# s3 bucket에 지정 파일 업로드
def s3_put_object(s3, bucket, filepath, access_key):
    '''
    s3: 연결된 s3 객체
    bucket: 버킷명
    filepath: 파일 위치
    access_key: 저장 파일명
    return: 성공 시 True, 실패 시 False 리턴
    '''
    try:
        s3.upload_file(filepath, bucket, access_key)
        print("######### upload model success !!")
    except Exception as e:
        print(e)
        return False
    return SUCCESS

# s3 bucket에서 지정 파일 다운로드
def s3_get_object(s3, bucket, object_name, file_name):
    '''
    s3: 연결된 s3 객체(boto3 client)
    bucket: 버킷명
    object_name: s3에 저장된 object 명
    file_name: 저장할 파일 명(path)
    return: 성공 시 True, 실패 시 False 리턴
    '''
    try:
        s3.download_file(bucket, object_name, file_name)  
    except Exception as e:
        print("#####################", e)
        return False
    return True

