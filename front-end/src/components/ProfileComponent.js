import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import ProductService from "../service/ProductService";

function ProfileComponent() {
  const [user, setUser] = useState([]);
  // const [userImg, setUserImg] = useState(
  //   {user.profileImg}
  // );
  useEffect(() => {
    ProductService.getMyPage().then((res) => {
      setUser(res.data);
      console.log(user);
    });
  }, []);
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_title}>
        <Link to={"/mypage"}>
          <IoClose size="30" className={styles.icon_close} />
        </Link>
        <p className={styles.title}>프로필 수정</p>
        <p className={styles.ok}>완료</p>
      </div>
      <div className={styles.user_img}>
        <img src={user.profileImg} alt=""></img>
      </div>
      <div className={styles.user_name}>
        <input type="text" placeholder={user.nickname} required></input>
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
