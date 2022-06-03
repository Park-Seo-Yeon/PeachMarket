from flask import Flask, request, redirect
from createPersonalModel import createModel
from createPersonalModel import doFitting
from createPersonalModel import removeBackground
from flask_cors import CORS
import urllib.request


app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

# 마이페이지의 "개인모델" 버튼 클릭 시 호출. 기존에 생성되어 있던 모델을 미리 보여준다.
@app.route("/getModel", methods=['GET', 'POST'])
def returnModel():
    content = request.form
    id = content['id']
    model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/image/" + id + ".jpg"
    try:
        res = urllib.request.urlopen(model_s3_url)
        if (res.status == 200) or (res.status == 302):
            return model_s3_url
    except: 
        return "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/NoModel.png"


# React에서 gener, id, weight, height, 셀카 정보 받아와서 개인 모델 생성 실행
@app.route("/model", methods=['GET', 'POST'])
def model():
    content = request.form
    selca = request.files['file']
    id = content['id']
    gender = content['gender']
    weight = int(content['weight'])
    height = int(content['height'])

    output_model_path = createModel(id, gender, weight, height, selca)
    
    if not output_model_path:
        return False
    model_path = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/" + output_model_path
    return model_path


# React에서 id, cloth 정보 받아와서 피팅 실행
@app.route("/fitting", methods = ['GET', 'POST'])
def fitting_clothes():
    content = request.form
    id = content['userId']
    cloth = content['img'].split("/")[-1].split(".")[0]
    extension = content['img'].split("/")[-1].split(".")[1]

    clothes = doFitting(id, cloth, extension)

    if clothes is True:
        return redirect("http://3.38.132.59:5001/tryOn/"+id)
    else:
        return "failed redirect"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")