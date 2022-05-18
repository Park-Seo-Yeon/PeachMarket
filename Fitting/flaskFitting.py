from flask import Flask, request
from fitting import main as fittingMain
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})


@app.route('/fitting_cpVtonPlus/<id>', methods=['GET', 'POST'])
def flaskFitting(id):
    # fittingMain()
    # return "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/" + id + ".jpg"
    return id

if __name__ == "__main__":
    app.run(host="127.0.0.2", port="5000")