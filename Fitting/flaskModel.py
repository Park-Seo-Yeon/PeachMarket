from flask import Flask, request, redirect
from createPersonalModel import createModel
from createPersonalModel import doFitting
from createPersonalModel import removeBackground
from flask_cors import CORS
import urllib.request


app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

@app.route("/getModel", methods=['GET', 'POST'])
def returnModel():
    content = request.form
    id = content['id']
    model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/image/" + id + ".jpg"
    try:
        print("###### model_s3_url : ", model_s3_url)
        res = urllib.request.urlopen(model_s3_url)
        if (res.status == 200) or (res.status == 302):
            return model_s3_url
    except: 
        return "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/NoModel.png"


## Spring boot에서 gener, id, weight, height 정보 받아와서 개인 모델 생성 실행
# createPersonalModel.py의 createModel() 실행
@app.route("/model", methods=['GET', 'POST'])
def model():
    content = request.form
    selca = request.files['file']
    id = content['id']
    gender = content['gender']
    weight = int(content['weight'])
    height = int(content['height'])

    print(content)

    output_model_path = createModel(id, gender, weight, height, selca)
    
    if not output_model_path:
        return False
    model_path = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/" + output_model_path
    print("############### in /model model_path  ", model_path)
    return model_path


## Spring boot에서 id, cloth, gender 정보 받아와서 피팅 실행
# createPersonalModel.py의 doFitting() 실행
# fitting.py 실행
@app.route("/fitting", methods = ['GET', 'POST'])
def fitting_clothes():
    content = request.form
    id = content['userId']
    cloth = content['img'].split("/")[-1].split(".")[0]

    print(content)
    print(cloth)
    # model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/" + id + "_" + cloth + ".jpg"
    # res = ""
    # try: 
    #     res = urllib.request.urlopen(model_s3_url)
    #     print("##### try status : ", res.status)
    #     if (res.status == 200) or (res.status == 302):
    #         return model_s3_url
    # except Exception as e:
    #     pass
    
    # print("########### pass try")
    clothes = doFitting(id, cloth)

    if clothes is True:
        return redirect("http://3.38.132.59:5001/tryOn/"+id)

    else:
        return "failed redirect"


@app.route("/rembg/<id>", methods = ['GET', 'POST'])
def removeBack(id):
    removeBackground(id)
    model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/" + id + ".jpg"
    return model_s3_url

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")