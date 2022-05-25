import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { GoKebabVertical, GoChevronLeft, GoChevronRight } from "react-icons/go";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/ProductService";
import TimeCounting from "time-counting";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useStore from "./useStore";

function ProductComponent() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const productId = useParams().productId;
  const { userId, setUserId } = useStore();
  const [open, setOpen] = useState(false);
  const { fittingImg, setFittingImg } = useStore();

  useEffect(() => {
    ProductService.getOneProduct(productId).then((res) => {
      setProduct(res.data);
      console.log(product);
    });
  }, []);

  const onClickDropDown = () => {
    setOpen(!open);
  };

  const deleteProduct = async () => {
    Swal.fire({
      text: "게시글을 정말 삭제하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#fea5ab",
      cancelButtonColor: "#f2f3f6",
      confirmButtonText: "삭제",
      cancelButtonText: "<a style='color:black'>취소<a>",
      reverseButtons: true,
      width: "350px",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "게시글이 삭제되었습니다",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });
        {
          ProductService.deleteProduct(productId).then((res) => {
            if (res.status == 200) {
              navigate("/");
            } else {
              Swal.fire({
                text: "게시글 삭제에 실패했습니다",
                confirmButtonColor: "#fea5ab",
                confirmButtonText: "확인",
                width: "350px",
              });
            }
          });
          ///////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////
          // 수정한 부분
          // 글 삭제는 어차피 본인일 때만 버튼이 보여서 일단 주석처리 해둠
          // 주석처리해도 동작은 잘 되더라 ...
          // 추가하는게 맞는 것인지 판단 부탁 ...
          // 코드의 간결한 정리가 가능하다면 부탁...
          // 주석은 없애도 상관 없음
          ///////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////
          //     .catch((error) => {
          //   if (error.response.status === 401 ) {
          //     console.log("글 삭제 에러");
          //     ProductService.getRefreshToken()
          //     .then((res) => {
          //       localStorage.setItem("token",res.data.accessToken);
          //     })
          //     .then(() => {
          //       window.location.reload();
          //     });
          //   }

          // });
        }
      }
    });
  };

  const onClickFitting = async (e) => {
    navigate("/fitting");
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("img", product.pictureUrl);

    try {
      const postSurvey = await axios.post(
        "http://localhost:5000/fitting",

        formData
      );
      console.log(postSurvey);
      setFittingImg(postSurvey.data);
    } catch (e) {
      console.error(e);
      Swal.fire({
        text: "가상 피팅에 실패했습니다",
        confirmButtonColor: "#fea5ab",
        confirmButtonText: "확인",
        width: "350px",
      });
    }
  };

  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

  return (
    <div className={styles.product_container}>
      <div className={styles.img_container}>
        {userId === product.user?.userId ? (
          <GoKebabVertical
            size="30"
            color="white"
            className={styles.icon_kebab}
            onClick={onClickDropDown}
          />
        ) : (
          ""
        )}
        {open && (
          <div className={styles.dropdown}>
            <ul>
              <Link to={`/write/${productId}`}>
                <li onClick={onClickDropDown}>수정</li>
              </Link>
              <li onClick={deleteProduct}>삭제</li>
            </ul>
          </div>
        )}
        {/* <Carousel
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <GoChevronLeft
                size="30"
                color="white"
                onClick={onClickHandler}
                className={styles.arrow}
                style={{ left: 0 }}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <GoChevronRight
                size="30"
                color="white"
                onClick={onClickHandler}
                className={styles.arrow}
                style={{ right: 0 }}
              />
            )
          }
          onClickItem={() => {
            window.open(
              "https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
            );
          }}
        >
          <img src={product.pictureUrl} alt="" className={styles.product_img} />
        </Carousel> */}
        <img
          src={product.pictureUrl}
          alt=""
          className={styles.product_img}
          onClick={() => {
            window.open(product.pictureUrl);
          }}
        />
      </div>
      <div className={styles.user_container}>
        <img
          src={product.user?.profileImg}
          alt=""
          className={styles.user_img}
        ></img>
        <p className={styles.user_name}>{product.user?.nickname}</p>
        <hr />
      </div>
      <div className={styles.content_container}>
        {/* <select value={product.productState}>
          <option value="판매중">판매중</option>
          <option value="예약중">예약중</option>
          <option value="거래완료">거래완료</option>
        </select> */}
        <div className={styles.product_state}>{product.productState}</div>
        <p className={styles.product_title}>{product.title}</p>
        <p className={styles.product_category}>
          {product.category?.category} ·{" "}
          {TimeCounting(product.createTime, option)}
        </p>
        <p className={styles.product_content}>{product.contents}</p>
        <p className={styles.product_count}>조회 {product.count}</p>
      </div>
      <div className={styles.function_container}>
        <p className={styles.product_price}>{product.price}원</p>
        <div className={styles.btn}>
          {/* <button>채팅</button> */}
          <button onClick={onClickFitting}>피팅</button>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
