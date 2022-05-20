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

function UserComponent() {
  const [user, setUser] = useState([]);
  const [clickedMenu, setClickedMenu] = useState("SaleMenu");
  useEffect(() => {
    ProductService.getMyPage().then((res) => {
      setUser(res.data);
    });
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
