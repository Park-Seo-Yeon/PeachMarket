import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Container, Col, Row } from "react-bootstrap";
import exdata from "./exdata.json";
import useStore from "./useStore";
import ProductService from "../service/ProductService";
import TimeCounting from "time-counting";

function MainComponent() {
  const [products, setProducts] = useState([]);
  const [cateProducts, setCateProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { category, setCategory } = useStore();

  useEffect(() => {
    setProducts(exdata.product);
    setCateProducts(exdata.product);
    changeCategory(category);
  }, [category]);

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data);
      setCateProducts(res.data);
    });
    changeCategory(category);
  }, [category]);

  const changeCategory = (category) => {
    if (category == "0") {
      setCateProducts(exdata.product);
    } else {
      setCateProducts(products.filter((d) => d.category == category));
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
        <div className="text-center my-5">
          <input
            type="text"
            placeholder="search..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <Row>
          {cateProducts
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
