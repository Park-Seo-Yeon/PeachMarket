from flask import Flask, request
from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME
from fitting import main as fittingMain

app = Flask(__name__)
s3 = s3_connection()

id = "chae"
gender = 2
weight = 58
height = 160
cloth = "cloth"

@app.route('/fitting_cpVtonPlus', methods=['GET', 'POST'])
def flaskFitting():
    # fittingMain()
    output_fitting_path = "C:/Users/suhyun/VirtualTryOn/cp-vton-plus-master/data/result/TOM/try-on/" + str(id) + ".jpg"
    s3_save_fitting_name = "fitting/" + str(id) + ".jpg"
    s3_put_object(s3, AWS_S3_BUCKET_NAME, output_fitting_path, s3_save_fitting_name)
    return "done fitting_cpVtonPlus"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5001")