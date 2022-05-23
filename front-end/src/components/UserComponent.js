import React, { useEffect, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiPerson } from "react-icons/gi";
import styles from "./User.module.css";
import SaleMenuComponent from "./SaleMenuComponent";
import PurchaseMenuComponent from "./PurchaseMenuComponent";
import ModelMenuComponent from "./ModelMenuComponent";
import { Link } from "react-router-dom";
import ProductService from "../service/ProductService";
import Swal from "sweetalert2";
import axios from "axios";

function UserComponent() {
  const [user, setUser] = useState([]);
  const [clickedMenu, setClickedMenu] = useState("SaleMenu");
  const [status, setStatus] = useState("");

  useEffect(() => {
    ProductService.getMyPage().then((res) =>{
      setUser(res.data);
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // 수정한 부분
      // 401 에러가 나면 POST 메소드로 /refresh로 요청을 보내게끔 짜두었음
      // 코드의 간결한 정리가 가능하다면 부탁... 
      // 주석은 없애도 상관 없음
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
    }).catch((error) => {
      if (error.response.status === 401 ) {
        console.log("토큰 만료로 인한 마이페이지 로드 에러");
        ProductService.getRefreshToken().then((res) => {
          localStorage.setItem("token",res.data.accessToken);
        })
        // 토큰 재발급 요청 시 새로고침을 해야지만 로컬스토리지에 저장된 값이 반영이 돼서 새로고침 코드도 포함시켰음
        .then(()=>{
          window.location.reload();
        });
      }
      
    })
  }, []);
  return (
    <div className={styles.user_container}>
      <div className={styles.mypage_container}>
        <p className={styles.title}>마이페이지</p>
        <img src={user.profileImg} alt="" className={styles.user_img}></img>
        <p className={styles.user_name}>{user.nickname}</p>
        <Link to={"/profile/1"}>
          <button className={styles.btn_edit}>프로필 수정</button>
        </Link>
      </div>
      <div className={styles.menu_container}>
        <div
          className={styles.menu_sale}
          onClick={() => {
            setClickedMenu("SaleMenu");
          }}
        >
          <TiDocumentText size="40" color="#fea5ab" />
          <p>판매내역</p>
        </div>
        <div
          className={styles.menu_purchase}
          onClick={() => {
            setClickedMenu("PurchaseMenu");
          }}
        >
          <MdOutlineShoppingBag size="40" color="#fea5ab" />
          <p>구매내역</p>
        </div>
        <div
          className={styles.menu_model}
          onClick={() => {
            setClickedMenu("ModelMenu");
          }}
        >
          <GiPerson size="40" color="#fea5ab" />
          <p>개인모델</p>
        </div>
      </div>
      <hr />
      <div className={styles.result_container}>
        {clickedMenu === "SaleMenu" && <SaleMenuComponent />}
        {clickedMenu === "PurchaseMenu" && <PurchaseMenuComponent />}
        {clickedMenu === "ModelMenu" && <ModelMenuComponent />}
      </div>
    </div>
  );
}

export default UserComponent;
