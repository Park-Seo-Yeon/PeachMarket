from flask import Flask, request
# from werkzeug.utils import secure_filename
from createPersonalModel import makePersonalModel
from createPersonalModel import createModel
from createPersonalModel import doFitting
from flask import send_file
# import URL

import os

from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME


app = Flask(__name__)
s3 = s3_connection()

id = "chae"
gender = 2
weight = 58
height = 160
cloth = "cloth"

# @app.route('/fileUpload', methods=['POST'])
# def upload():
#     f = request.files['file']
#     f.save("./temp")
    
#     ret = s3_get_object(s3, AWS_S3_BUCKET_NAME, 'selca/chae.jpg', 'data/s3Test/chae.jpg')
#     if ret :
#         print("파일 저장 성공")
#     else:
#         print("파일 저장 실패")

@app.route("/")
def hello():
    # gender, id, weight, height = makePersonalModel()
    info = '''
        gender : {}<br>
        id : {}<br>
        weight : {}<br>
        height : {}<br>
    '''.format(gender, id, weight, height)
    return info

## Spring boot에서 gener, id, weight, height 정보 받아와서 개인 모델 생성 실행
# createPersonalModel.py의 createModel() 실행
@app.route("/createModel", methods=['GET', 'POST'])
def model():
    # id = "chae"
    # gender = 2
    # weight = 58
    # height = 160
    model = createModel(id, gender, weight, height, s3)
    if model != False:
        print("##### done save personal model image ######")
        return "true"
        # return str(id) + " create model success!!"
        filename = 'C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/image' + str(id) + '.jpg'
        #send_file(model, mimetype="image/jpg")
    else:
        print("##### fail save personal model image ######")
        return "false"
        # return str(id) + " create model fail"
    

## Spring boot에서 id, cloth, gender 정보 받아와서 피팅 실행
# createPersonalModel.py의 doFitting() 실행
# fitting.py 실행
@app.route("/fitting_window")
def fitting_window():
    message = doFitting(id, cloth, gender)
    return "done fitting_window"

# from fitting import main as fittingMain

# @app.route("/fitting_cpVtonPlus")
# def fitting_cpVtonPlus():
#     fittingMain()
#     return "done fitting"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000")