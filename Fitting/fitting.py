import LIP_JPPNet.evaluate_pose_JPPNet as pose
import LIP_JPPNet.evaluate_parsing_JPPNet as parsing
import openPoseCoco as createPose

def main():
    pose.main()
    parsing.main()
    createPose.main()

if __name__ == '__main__':
    print("run LIP_JPPNet ###################################")
    main()