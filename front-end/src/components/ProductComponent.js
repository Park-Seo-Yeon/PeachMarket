import React from "react";
import styles from "./Product.module.css";
import { GoKebabVertical } from "react-icons/go";
import { Carousel, Dropdown } from "react-bootstrap";

function ProductComponent() {
  const onClickImg = () => {
    window.open(
      "https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
    );
  };
  return (
    <div className={styles.product_container}>
      <div className={styles.img_container}>
        <GoKebabVertical
          size="30"
          color="white"
          className={styles.icon_kebab}
        />
        <img
          src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
          alt=""
          className={styles.product_img}
          onClick={onClickImg}
        ></img>
      </div>
      <div className={styles.user_container}>
        <img
          src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/DefaultProfileImage.png"
          alt=""
          className={styles.user_img}
        ></img>
        <p className={styles.user_name}>판매자 이름</p>
        <hr />
      </div>
      <div className={styles.content_container}>
        <select>
          <option>판매중</option>
          <option>예약중</option>
          <option>거래완료</option>
        </select>
        <p className={styles.product_title}>제목</p>
        <p className={styles.product_category}>카테고리·시간</p>
        <p className={styles.product_content}>내용</p>
        <p className={styles.product_count}>조회수</p>
      </div>
      <div className={styles.function_container}>
        <p className={styles.product_price}>가격</p>
        <div className={styles.btn}>
          <button>채팅</button>
          <button>피팅</button>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
