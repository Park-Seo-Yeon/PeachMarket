import cv2
from flask import Flask, request, redirect, url_for
# from werkzeug.utils import secure_filename
from createPersonalModel import createModel
from createPersonalModel import doFitting
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})


## Spring boot에서 gener, id, weight, height 정보 받아와서 개인 모델 생성 실행
# createPersonalModel.py의 createModel() 실행
@app.route("/createModel", methods=['GET', 'POST'])
def model():
    content = request.form
    selca = request.files['file']
    id = content['id']
    gender = content['gender']
    weight = int(content['weight'])
    height = int(content['height'])

    output_model_path = createModel(id, gender, weight, height, selca)
    model_path = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/" + output_model_path
    return model_path


## Spring boot에서 id, cloth, gender 정보 받아와서 피팅 실행
# createPersonalModel.py의 doFitting() 실행
# fitting.py 실행
@app.route("/fitting_window", methods = ['GET', 'POST'])
def fitting_window():
    content = request.form
    # id = content['id']
    cloth = content['file'].split("/")[-1].split(".")[0]

    id = "testW"
    # cloth = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/origin_cloth/clothes9.jpg"
    # cloth = cloth.split("/")[-1].split(".")[0]
    clothes = doFitting(id, cloth)

    if clothes is True:
        return redirect("http://127.0.0.2:5000/fitting_cpVtonPlus/"+id)
    else:
        return "failed fitting_window"

    # return redirect(url_for("http://127.0.0.2:5000/fitting_cpVtonPlus", id = id))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000")