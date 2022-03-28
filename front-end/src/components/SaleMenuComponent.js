import React, { useState } from "react";
import styles from "./Menu.module.css";

function SaleMenuComponent() {
  const [clickedMenu, setClickedMenu] = useState("ForSale");
  return (
    <div>
      <div className={styles.title_tab}>판매내역</div>
      <div className={styles.tab}>
        <div
          className={clickedMenu === "ForSale" ? styles.selected_tab : ""}
          onClick={() => {
            setClickedMenu("ForSale");
          }}
        >
          판매중
        </div>
        <div
          className={clickedMenu === "SoldOut" ? styles.selected_tab : ""}
          onClick={() => {
            setClickedMenu("SoldOut");
          }}
        >
          판매완료
        </div>
      </div>
      <div className={styles.result}>
        {clickedMenu === "ForSale" ? (
          <div>
            <div className={styles.message}>판매중인 상품이 없어요.</div>
          </div>
        ) : (
          <div>
            <div className={styles.message}>판매 완료된 상품이 없어요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleMenuComponent;
