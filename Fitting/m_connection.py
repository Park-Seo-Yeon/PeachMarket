# import module
from sre_constants import SUCCESS
import boto3

from m_config import AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY
from m_config import AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION

# from flaskext.mysql improt MySQL

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
    :param s3: 연결된 s3 객체(boto3 client)
    :param bucket: 버킷명
    :param filepath: 파일 위치
    :param access_key: 저장 파일명
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
    :param s3: 연결된 s3 객체(boto3 client)
    :param bucket: 버킷명
    :param object_name: s3에 저장된 object 명
    :param file_name: 저장할 파일 명(path)
    :return: 성공 시 True, 실패 시 False 반환
    '''
    try:
        s3.download_file(bucket, object_name, file_name)
    except Exception as e:
        print("#####################", e)
        return False
    return True

# def main():
#     s3 = s3_connection()
#     s3_get_object(s3, AWS_S3_BUCKET_NAME, 'selca/chae.jpg', 'data/s3Test/chae.jpg')
#     print("sucess! ########")

# if __name__=="__main__":
#     main()    