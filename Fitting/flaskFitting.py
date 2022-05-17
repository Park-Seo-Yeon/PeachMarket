from flask import Flask, request
from m_connection import s3_connection, s3_put_object, s3_get_object
from m_config import AWS_S3_BUCKET_NAME
from fitting import main as fittingMain
from flask import send_file


app = Flask(__name__)
s3 = s3_connection()
# CORS(app)


@app.route('/fitting_cpVtonPlus/<id>', methods=['GET', 'POST'])
def flaskFitting(id):
    # content = request.form
    # id = content['id']
    # id = request.args.get('id')
    # id = 'chae'
    fittingMain()
    output_fitting_path = "C:/Users/suhyun/PeachMarket/Fitting/data/result/TOM/try-on/" + str(id) + ".jpg"
    s3_save_fitting_name = "fitting/" + str(id) + ".jpg"
    s3_put_object(s3, AWS_S3_BUCKET_NAME, output_fitting_path, s3_save_fitting_name)
    
    return send_file(output_fitting_path, mimetype='image/jpg')
    return id

if __name__ == "__main__":
    app.run(host="127.0.0.2", port="5000")