import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Container, Col, Row, Form } from "react-bootstrap";
import exdata from "./exdata.json";
import useStore from "./useStore";
import ProductService from "../service/ProductService";
import TimeCounting from "time-counting";

function MainComponent(props) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { category, setCategory } = useStore();

  /*
  useEffect(() => {
    changeCategory(category, exdata.product);
  }, [category]);
  */

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      changeCategory(category, res.data);
    });
  }, [category]);

  const changeCategory = (category, data) => {
    if (category == "0") {
      setProducts(data);
    } else {
      setProducts(data.filter((d) => d.category == category));
    }
  };

  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

  return (
    <div className={styles.container}>
      <Container>
        {props.searchStatus ? (
          <div>
            <Form.Control
              type="text"
              placeholder="검색"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        ) : (
          ""
        )}
        <Row>
          {products
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((product) => (
              <Col lg={6} key={product.productId}>
                <Link to={`./products/${product.productId}`}>
                  <div className={styles.product_container}>
                    <img
                      className={styles.product_img}
                      src={product.pictureUrl}
                      alt=""
                    ></img>
                    <div className={styles.product_info}>
                      <p className={styles.product_title}>{product.title}</p>
                      <p className={styles.product_time}>
                        {TimeCounting(product.createTime, option)}
                      </p>
                      <p className={styles.product_price}>{product.price}원</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>

      <Link to={"/write/new"}>
        <AiFillPlusCircle className={styles.createBtn} />
      </Link>
    </div>
  );
}

export default MainComponent;
