import React, { useState } from "react";
import styles from "./Profile.module.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function ProfileComponent() {
  const [userImg, setUserImg] = useState(
    "https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/DefaultProfileImage.png"
  );
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_title}>
        <Link to={"/user/1"}>
          <IoClose size="30" className={styles.icon_close} />
        </Link>
        <p className={styles.title}>프로필 수정</p>
        <p className={styles.ok}>완료</p>
      </div>
      <div className={styles.user_img}>
        <img src={userImg} alt=""></img>
      </div>
      <div className={styles.user_name}>
        <input type="text" required></input>
      </div>
      <div className={styles.message}>
        <p>닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.</p>
      </div>
      <div className={styles.btn}>
        <button>완료</button>
      </div>
    </div>
  );
}

export default ProfileComponent;
