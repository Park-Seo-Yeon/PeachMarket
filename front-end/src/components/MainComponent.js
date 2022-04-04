import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Container, Col, Row } from "react-bootstrap";

function MainComponent() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <Container>
        <Row>
          <Col lg={6}>
            <Link to={`./products/${1}`}>
              <div className={styles.product_container}>
                <img
                  className={styles.product_img}
                  src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
                  alt=""
                ></img>
                <div className={styles.product_info}>
                  <p className={styles.product_title}>후리스</p>
                  <p className={styles.product_time}>3분 전</p>
                  <p className={styles.product_price}>30,000원</p>
                </div>
              </div>
            </Link>
          </Col>
          <Col lg={6}>
            <Link to={"./products/1"}>
              <div className={styles.product_container}>
                <img
                  className={styles.product_img}
                  src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
                  alt=""
                ></img>
                <div className={styles.product_info}>
                  <p className={styles.product_title}>후리스</p>
                  <p className={styles.product_time}>3분 전</p>
                  <p className={styles.product_price}>30,000원</p>
                </div>
              </div>
            </Link>
          </Col>
          
 {/*          {products.map((product) => {
            <Col lg={6} key={product.productId}>
              <Link to={`./products/${product.productId}`}>
                <div className={styles.product_container}>
                  <img
                    className={styles.product_img}
                    src={product.productImg}
                    alt=""
                  ></img>
                  <div className={styles.product_info}>
                    <p className={styles.product_title}>{product.title}</p>
                    <p className={styles.product_time}>{product.createTime}</p>
                    <p className={styles.product_price}>{product.price}</p>
                  </div>
                </div>
              </Link>
            </Col>;
          })} */}
          <Col lg={6}>
            <Link to={`./products/${1}`}>
              <div className={styles.product_container}>
                <img
                  className={styles.product_img}
                  src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
                  alt=""
                ></img>
                <div className={styles.product_info}>
                  <p className={styles.product_title}>후리스</p>
                  <p className={styles.product_time}>3분 전</p>
                  <p className={styles.product_price}>30,000원</p>
                </div>
              </div>
            </Link>
          </Col>
          <Col lg={6}>
            <Link to={`./products/${1}`}>
              <div className={styles.product_container}>
                <img
                  className={styles.product_img}
                  src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
                  alt=""
                ></img>
                <div className={styles.product_info}>
                  <p className={styles.product_title}>후리스</p>
                  <p className={styles.product_time}>3분 전</p>
                  <p className={styles.product_price}>30,000원</p>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>

      <Link to={"/write"}>
        <AiFillPlusCircle className={styles.createBtn} />
      </Link>
    </div>
  );
}

export default MainComponent;
