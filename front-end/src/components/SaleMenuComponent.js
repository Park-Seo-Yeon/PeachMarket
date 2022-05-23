import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TimeCounting from "time-counting";
import ProductService from "../service/ProductService";
import styles from "./Menu.module.css";

import useStore from "./useStore";

function SaleMenuComponent() {
  const [clickedMenu, setClickedMenu] = useState("ForSale");
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const { userToken, setUserToken } = useStore();

  useEffect(() => {
    ProductService.getMyPage().then((res) => {
      setUser(res.data);
      setProducts(res.data.products);
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // 수정한 부분
      // 근데 판매내역 같은 경우에는 마이페이지 안에 (?) 있는 거라 이렇게 추가 안 해도 오류 안 나는듯 .. ???? => 잘 모름 ..
      // 401 에러가 나면 POST 메소드로 /refresh로 요청을 보내게끔 짜두었음
      // 코드의 간결한 정리가 가능하다면 부탁...
      // 주석은 없애도 상관 없음
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // }).catch((error) => {
      //   if (error.response.status === 401 ) {
      //     console.log("토큰 만료로 인한 판매내역 로드 에러");
      //     ProductService.getRefreshToken()
      //     .then((res) => {
      //       localStorage.setItem("token",res.data.accessToken); // 재발급 받은 토큰 저장
      //     })
      //     .then(()=>{
      //       // 토큰 재발급 요청 시 새로고침을 해야지만 로컬스토리지에 저장된 값이 반영이 돼서 새로고침 코드도 포함시켰음
      //       window.location.reload();
      //     });
      //   }
      // })
    });
  }, [userToken]);
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
              {
                products
                  .filter(
                    (product) =>
                      product.productState === "판매중" ||
                      product.productState === "예약중"
                  )
                  .map((product) =>
                    products.length > 0 ? (
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
                    ) : (
                      <div className={styles.message}>
                        판매중인 상품이 없어요.
                      </div>
                    )
                  )
                // .sort((a, b) => {
                //   return a.count.localeCompare(b.count);
                // })
              }
            </Container>
            {/* <div className={styles.message}>판매중인 상품이 없어요.</div> */}
          </div>
        ) : (
          <div>
            <Container>
              {products
                .filter((product) => product.productState === "판매완료")
                .map((product) =>
                  products.length > 0 ? (
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
                  ) : (
                    <div className={styles.message}>
                      판매 완료된 상품이 없어요.
                    </div>
                  )
                )}
            </Container>
            {/* <div className={styles.message}>판매 완료된 상품이 없어요.</div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleMenuComponent;
