import React from "react";
import styles from "./Menu.module.css";

function ModelMenuComponent() {
  return (
    <div>
      <div className={styles.title_noTab}>개인모델</div>
      <div className={styles.btn}>
        <button>사진 찍기</button>
        <button>앨범에서 가져오기</button>
      </div>
    </div>
  );
}

export default ModelMenuComponent;
