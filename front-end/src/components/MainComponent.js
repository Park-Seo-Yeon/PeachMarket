import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Container, Col, Row } from "react-bootstrap";
import exdata from "./exdata.json";
import useStore from "./useStore";
import ProductService from "../service/ProductService";

function MainComponent() {
  const [products, setProducts] = useState([]);
  const [cateProducts, setCateProducts] = useState([]);
  const { category, setCategory } = useStore();

  
  useEffect(() => {
    setProducts(exdata.product);
    setCateProducts(exdata.product);
    changeCategory(category);
  }, [category]);
  
/*
  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data);
      setCateProducts(res.data);
    });
    changeCategory(category);
  }, [category]);
  */

  const changeCategory = (category) => {
    if (category == "전체") {
      setCateProducts(exdata.product);
    } else {
      setCateProducts(products.filter((d) => d.category == category));
    }
  };

  return (
    <div className={styles.container}>
      <Container>
        <Row>
          {cateProducts.map((product) => (
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
            </Col>
          ))}
        </Row>
      </Container>

      <Link to={"/write"}>
        <AiFillPlusCircle className={styles.createBtn} />
      </Link>
    </div>
  );
}

export default MainComponent;
