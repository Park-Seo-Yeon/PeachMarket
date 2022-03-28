import React from "react";
import styles from "./Menu.module.css";

function PurchaseMenuComponent() {
  return (
    <div>
      <div className={styles.title_noTab}>구매내역</div>
      <div class={styles.message}>구매내역이 없어요.</div>
    </div>
  );
}

export default PurchaseMenuComponent;
