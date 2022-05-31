from flask import Flask, request, redirect
# from fitting import main as fittingMain
import test 
from flask_cors import CORS
import time
# import LIP_JPPNet.evaluate_pose_JPPNet as pose
# import LIP_JPPNet.evaluate_parsing_JPPNet as parsing
# import openPoseCoco as createPose

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})


@app.route('/tryOn/<id>', methods=['GET', 'POST'])
def flaskFitting(id):
    # model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/" + id + "_" + cloth + ".jpg"
    model_s3_url = "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/" + id + ".jpg"
    # fittingMain()

    # pose.main()
    # parsing.main()
    # createPose.main()
    # test.main()
    # return redirect("http://3.38.132.59:5000/rembg/"+id)
    # return model_s3_url

    # time.sleep(1)
    return "https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/data/result/TOM/try_on/suhyun_clothes6.jpg"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5001")