import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TimeCounting from "time-counting";
import ProductService from "../service/ProductService";
import styles from "./Menu.module.css";

function SaleMenuComponent() {
  const [clickedMenu, setClickedMenu] = useState("ForSale");
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getMyPage().then((res) => {
      setUser(res.data);
      setProducts(res.data.products);
    });
  }, []);

  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

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
            <Container>
              {products
                .filter((product) => {
                  return product;
                })
                .map((product) => (
                  <div lg={6} key={product.productId}>
                    <Link to={`../products/${product.productId}`}>
                      <div className={styles.product_container}>
                        <img
                          className={styles.product_img}
                          src={product.pictureUrl}
                          alt=""
                        ></img>
                        <div className={styles.product_info}>
                          <p className={styles.product_title}>
                            {product.title}
                          </p>
                          <p className={styles.product_time}>
                            {TimeCounting(product.createTime, option)}
                          </p>
                          <div className={styles.product_div}>
                            <div className={styles.product_state}>
                              {product.productState}
                            </div>
                            <p className={styles.product_price}>
                              {product.price}원
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </Container>
            {/* <div className={styles.message}>판매중인 상품이 없어요.</div> */}
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
