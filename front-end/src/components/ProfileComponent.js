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
    });
  }, []);

  const onClickCancel =() =>{
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
        navigate("/");
      }
    });

  }

  const onClickOk = () => {
    let userProfile = {
      // 이름 수정
      nickname: userNickName,
      height: userHeight,
      weight: userWeight,
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

        navigate("/");
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
          <IoClose size="30" onClick={onClickCancel} className={styles.icon_close} />
        <p className={styles.title}>프로필 수정</p>
        <p className={styles.ok}>완료</p>
      </div>
      <div className={styles.user_img}>
        <img src={user.profileImg} alt=""></img>
      </div>
      <div className={styles.user_name}>
        <input
          type="text"
          onChange={userNickNameHandler}
          placeholder={userNickName}
          required
        ></input>

        <input
          type="text"
          onChange={userHeightHandler}
          placeholder={userHeight}
          required
        ></input>

        <input
          type="text"
          onChange={userWeightHandler}
          placeholder={userWeight}
          required
        ></input>
      </div>
      <div className={styles.message}>
        <p>닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.</p>
      </div>
      <div className={styles.btn}>
        <button onClick={onClickOk}>완료</button>
      </div>
    </div>
  );
}

export default ProfileComponent;