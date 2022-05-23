import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../service/ProductService";
import Swal from "sweetalert2";

function ProfileComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [userNickName, setUserNickName] = useState("");
  const userNickNameHandler = (e) => {
    e.preventDefault();
    setUserNickName(e.target.value);
  };
  const [userHeight, setUserHeight] = useState("");
  const userHeightHandler = (e) => {
    e.preventDefault();
    setUserHeight(e.target.value);
  };
  const [userWeight, setUserWeight] = useState("");
  const userWeightHandler = (e) => {
    e.preventDefault();
    setUserWeight(e.target.value);
  };
  const [userGender, setUserGender] = useState("");
  const userGenderHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "남성") setUserGender("m");
    else setUserGender("f");
  };

  // const [userImg, setUserImg] = useState(
  //   {user.profileImg}
  // );
  useEffect(() => {
    ProductService.getMyPage().then((res) => {
      setUser(res.data);
      console.log(user);
      setUserNickName(res.data.nickname);
      setUserHeight(res.data.height);
      setUserWeight(res.data.weight);
      setUserGender(res.data.gender);
    });
  }, []);

  const onClickCancel = () => {
    Swal.fire({
      text: "프로필 수정을 취소하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#fea5ab",
      cancelButtonColor: "#f2f3f6",
      confirmButtonText: "네",
      cancelButtonText: "<a style='color:black'>아니요<a>",
      reverseButtons: true,
      width: "350px",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/mypage");
      }
    });
  };

  const onClickOk = () => {
    let userProfile = {
      userNickName: userNickName,
      userHeight: userHeight,
      userHWight: userWeight,
      userGender: userGender,
    };

    console.log(userProfile);

    ProductService.updateUserProfile(userProfile)
      .then((res) => {
        Swal.fire({
          text: "프로필을 수정하였습니다.",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });

        navigate("/mypage");
      })
      .catch((error) =>
        Swal.fire({
          text: "프로필 수정을 실패했습니다",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        })
      );
  };
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_title}>
        <IoClose
          size="30"
          onClick={onClickCancel}
          className={styles.icon_close}
        />
        <p className={styles.title}>프로필 수정</p>
        <p className={styles.ok} onClick={onClickOk}>
          완료
        </p>
      </div>
      <div className={styles.user_img}>
        <img src={user.profileImg} alt=""></img>
      </div>
      <div className={styles.edit_container}>
        <div className={styles.user_name}>
          <p>닉네임</p>
          <input
            type="text"
            onChange={userNickNameHandler}
            value={userNickName}
            required
          ></input>
        </div>
        <div className={styles.user_height}>
          <p>키</p>
          <input
            type="text"
            onChange={userHeightHandler}
            value={userHeight}
            required
          ></input>
        </div>
        <div className={styles.user_weight}>
          <p>몸무게</p>
          <input
            type="text"
            onChange={userWeightHandler}
            value={userWeight}
            required
          ></input>
        </div>
        <div className={styles.user_gender}>
          <p>성별</p>
          <select
            onChange={userGenderHandler}
            value={userGender ? userGender : ""}
          >
            <option value="m">남성</option>
            <option value="f">여성</option>
          </select>
        </div>
      </div>
      <div className={styles.message}>
        <p>닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.</p>
      </div>
      {/* <div className={styles.btn}>
        <button onClick={onClickOk}>완료</button>
      </div> */}
    </div>
  );
}

export default ProfileComponent;
