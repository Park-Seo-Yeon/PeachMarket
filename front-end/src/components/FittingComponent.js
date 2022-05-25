import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "./useStore";
import { Spinner } from "react-bootstrap";

function FittingComponent() {
  const navigate = useNavigate();
  const { fittingImg, setFittingImg } = useStore();
  const [viewImg, setViewImg] = useState("");

  useEffect(() => {
    setViewImg(fittingImg);
  }, [fittingImg]);

  console.log(fittingImg);
  return (
    <div className={styles.fitting_container}>
      <div className={styles.fitting_title}>
        <IoClose
          size="30"
          className={styles.icon_close}
          onClick={() => {
            navigate(-1);
          }}
        />
        <p className={styles.title}>가상 피팅</p>
        <p className={styles.ok_hidden}>완료</p>
      </div>
      {fittingImg === "" ? (
        <div className={styles.loading_container}>
          <Spinner
            animation="border"
            style={{ color: "#fea5ab" }}
            className={styles.loading_spinner}
          />
          <p className={styles.loading_text}>가상 피팅 중</p>
        </div>
      ) : (
        <div className={styles.fittingImg_container}>
          <img src={fittingImg} className={styles.fittingImg}></img>
        </div>
      )}
    </div>
  );
}

export default FittingComponent;
