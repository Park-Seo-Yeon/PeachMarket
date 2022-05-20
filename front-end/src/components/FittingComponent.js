import React from "react";
import styles from "./Profile.module.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function FittingComponent() {
  return (
    <div className={styles.fitting_container}>
      <div className={styles.fitting_title}>
        <Link to={"/product"}>
          <IoClose size="30" className={styles.icon_close} />
        </Link>
        <p className={styles.title}>가상 피팅</p>
        <p className={styles.ok}>완료</p>
      </div>
    </div>
  );
}

export default FittingComponent;
