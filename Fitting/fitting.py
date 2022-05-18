import LIP_JPPNet.evaluate_pose_JPPNet as pose
import LIP_JPPNet.evaluate_parsing_JPPNet as parsing
from openPoseCoco import main as createPose
from test import main as fitting

def main():
    pose.main()
    parsing.main()
    createPose()
    fitting("GMM")
    fitting("TOM")

if __name__ == '__main__':
    print("run lip jppnet ###################################")
    main()