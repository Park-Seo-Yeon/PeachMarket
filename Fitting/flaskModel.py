from cv2 import idct
from flask import Flask, request, redirect, url_for
# from werkzeug.utils import secure_filename
from createPersonalModel import createModel
from createPersonalModel import doFitting
from flask import send_file
from flask_cors import CORS

from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME


app = Flask(__name__)#, static_folder="createModel")
CORS(app, resources={r'*': {'origins': '*'}})

id = "chae"
gender = 2
# weight = 58
# height = 160
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

# @app.route("/")
# def hello():
#     # gender, id, weight, height = makePersonalModel()
#     info = '''
#         gender : {}<br>
#         id : {}<br>
#         weight : {}<br>
#         height : {}<br>
#     '''.format(gender, id, weight, height)
#     return info

## Spring boot에서 gener, id, weight, height 정보 받아와서 개인 모델 생성 실행
# createPersonalModel.py의 createModel() 실행
@app.route("/createModel", methods=['GET', 'POST'])
def model():
    # content = request.form
    selca = request.files['file']
    
    # id = content['id']
    # gender = int(content['gender'])
    # weight = int(content['weight'])
    # height = int(content['height'])

    id = "chae"
    gender = 2
    weight = 58
    height = 160
    
    # selca = content['selca']
    # print("#################", content)
    print("#################", selca)

    local_selca_paty = 'C:/Users/suhyun/PeachMarket/Fitting/data/face/' + id + '.jpg'
    selca.save(local_selca_paty)
    # return send_file(local_selca_paty, mimetype='image/jpg')

    model = createModel(id, gender, weight, height, selca)
    # model_path = "C:/Users/suhyun/PeachMarket/Fitting/data/image/" + id + ".jpg"
    # return send_file(model_path, mimetype='image/jpg')
    model_path = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/model/" + id + ".jpg"
    return model_path
    # return send_file(model_path, mimetype='image/jpg')

## Spring boot에서 id, cloth, gender 정보 받아와서 피팅 실행
# createPersonalModel.py의 doFitting() 실행
# fitting.py 실행
@app.route("/fitting_window", methods = ['GET', 'POST'])
def fitting_window():
    # content = request.form
    # print("#################", content)
    # id = content['id']
    # gender = int(content['gender'])
    # cloth = content['cloth']
    id = "chae"
    gender = 2
    cloth = "cloth4"

    cloths = doFitting(id, cloth, gender)
    return redirect("http://127.0.0.2:5000/fitting_cpVtonPlus/"+id)
# from fitting import main as fittingMain


# @app.route("/fitting_cpVtonPlus")
# def fitting_cpVtonPlus():
#     fittingMain()
#     return "done fitting"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000")