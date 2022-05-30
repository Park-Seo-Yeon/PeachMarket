import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { Form } from "react-bootstrap";
import styles from "./Write.module.css";
import axios from "axios";
import $ from "jquery"; // jQuery 사용을 위해 추가

import useStore from "./useStore";

import { Link, useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/ProductService";
import Swal from "sweetalert2";

function WriteComponent() {
  const navigate = useNavigate();
  const productId = useParams().productId;
  const { userToken, setUserToken } = useStore();

  const { changeCategory, setChangeCategory } = useStore();

  useEffect(() => {
    setChangeCategory("0");
    ProductService.getMyPage()
      .then((res) => {
        console.log("토큰 확인");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("토큰 만료로 인한 페이지 로드 에러");
          ProductService.getRefreshToken().then((res) => {
            console.log(res.data.accessToken);
            localStorage.setItem("token", res.data.accessToken);
            setUserToken(res.data.accessToken);
          });
        }
      });
  }, [userToken]);

  const [title, setTitle] = useState("");

  const titleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const [category, setCategory] = useState();

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const [productState, setProductState] = useState();

  const productStateHandler = (e) => {
    e.preventDefault();
    setProductState(e.target.value);
  };

  const [price, setPrice] = useState("");

  const priceHandler = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };
  const [contents, setContents] = useState("");

  const contentsHandler = (e) => {
    e.preventDefault();
    setContents(e.target.value);
  };

  const [imgBase64, setImgBase64] = useState(""); //미리보기
  const [imgFile, setImgFile] = useState(null);

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  };

  const onClickCancel = () => {
    if (productId === "new") {
      Swal.fire({
        text: "작성 중인 글을 취소하시겠어요?",
        showCancelButton: true,
        confirmButtonColor: "#fea5ab",
        cancelButtonColor: "#f2f3f6",
        confirmButtonText: "네",
        cancelButtonText: "<a style='color:black'>아니요<a>",
        reverseButtons: true,
        width: "350px",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        text: "수정 중인 글을 취소하시겠어요?",
        showCancelButton: true,
        confirmButtonColor: "#fea5ab",
        cancelButtonColor: "#f2f3f6",
        confirmButtonText: "네",
        cancelButtonText: "<a style='color:black'>아니요<a>",
        reverseButtons: true,
        width: "350px",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/products/${productId}`);
        }
      });
    }
  };

  const returnTitle = () => {
    if (productId === "new") {
      return <p className={styles.top_container_title}>중고거래 글쓰기</p>;
    } else {
      return <p className={styles.top_container_title}>중고거래 글 수정하기</p>;
    }
  };

  const onClickOk = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("file", imgFile);

    let dataSet = {
      title: title,
      categoryId: category,
      productState: productState,
      price: price,
      contents: contents,
    };

    const json = JSON.stringify(dataSet);
    const blob = new Blob([json], { type: "application/json" });

    if (productId === "new") {
      try {
        formData.append("data", blob);

        const postSurvey = await axios({
          method: "POST",
          url: "http://3.38.132.59:8080/api/products/create",
          //url: "http://localhost:8080/api/products/create",
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: formData,
        });
        console.log(blob);
        console.log(postSurvey);
        navigate("/");
      } catch (error) {
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // 수정한 부분
        // 500 에러가 나면 POST 메소드로 /refresh로 요청을 보내게끔 짜두었음
        // 이유는 모르겠으나 토큰이 만료된 상태로 '완료' 버튼을 누르면 401 에러가 아니라 500 에러가 남
        // 보고 거기에도 이러한 코드들을 추가하는게 맞는 것인지 판단 부탁 ...
        // 코드의 간결한 정리가 가능하다면 부탁...
        // 주석은 없애도 상관 없음
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        if (error.response.status === 500) {
          console.log("토큰 만료로 인한 글 작성 에러");
          ProductService.getRefreshToken()
            .then((res) => {
              localStorage.setItem("token", res.data.accessToken);
            })
            .then(() => {
              // 토큰 재발급 요청 시 새로고침을 해야지만 로컬스토리지에 저장된 값이 반영이 돼서 새로고침 코드도 포함시켰음
              window.location.reload();
            });
        } else {
          Swal.fire({
            text: "사진, 제목, 카테고리, 내용, 가격은 필수 입력 항목이에요",
            confirmButtonColor: "#fea5ab",
            confirmButtonText: "확인",
            width: "350px",
          });
        }
      }
    } else {
      try {
        formData.append("data", blob);
        const putSurvey = await axios({
          method: "PUT",
          url: "http://3.38.132.59:8080/api/products/edit/" + productId,
          //url: "http://localhost:8080/api/products/edit/" + productId,
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: formData,
        });
        console.log(blob);
        console.log(putSurvey);
        navigate(`/products/${productId}`);
      } catch (error) {
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // 수정한 부분
        // 글 수정은 어차피 본인일 때만 버튼이 보여서 일단은 주석 처리해둠
        // 주석처리해도 동작은 잘 되더라 ...
        // 추가하는게 맞는 것인지 판단 부탁 ...
        // 코드의 간결한 정리가 가능하다면 부탁...
        // 주석은 없애도 상관 없음
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // if (error.response.status === 401) {
        //   console.log("토큰 만료로 인한 수정 에러");
        //   ProductService.getRefreshToken()
        //   .then((res) => {
        //     localStorage.setItem("token",res.data.accessToken);
        //   })
        //   .then(()=>{
        //     // 토큰 재발급 요청 시 새로고침을 해야지만 로컬스토리지에 저장된 값이 반영이 돼서 새로고침 코드도 포함시켰음
        //     window.location.reload();
        //   });
        // } else {
        Swal.fire({
          text: "사진, 제목, 카테고리, 내용, 가격은 필수 입력 항목이에요",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });
        //}
      }
    }
  };

  useEffect(() => {
    if (productId === "new") {
      return;
    } else {
      ProductService.getOneProduct(productId).then((res) => {
        let product = res.data;
        setTitle(product.title);
        setCategory(product.category?.categoryId);
        setProductState(product.productState);
        setPrice(product.price);
        setContents(product.contents);
        setImgBase64(product.pictureUrl);
        setImgFile(product.pictureUrl);
        $(
          "#selectCategory option[value=" + product.category?.categoryId + "]"
        ).attr("selected", true);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <IoClose size="24" onClick={onClickCancel} />
        {returnTitle()}
        <p className={styles.top_container_ok} onClick={onClickOk}>
          완료
        </p>
      </div>
      <div>
        <Form>
          <div className={styles.file_container}>
            <label htmlFor="inputFile">
              <div className={styles.file_container_icon}>
                <AiFillCamera size="30" />
              </div>
            </label>
            <input
              type="file"
              id="inputFile"
              onChange={handleChangeFile}
              className={styles.file_container_upload}
            />

            <div className={styles.file_container_uploadImg}>
              <p>{imgFile && <img src={imgBase64} alt="" />}</p>
            </div>
          </div>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="글 제목"
              size="lg"
              value={title}
              onChange={titleHandler}
              className="mb-3"
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            size="lg"
            onChange={categoryHandler}
            className="mb-3"
            id="selectCategory"
          >
            <option>카테고리 선택</option>
            <option value="1">상의</option>
            <option value="2">아우터</option>
            <option value="3">스커트</option>
            <option value="4">팬츠</option>
            <option value="5">원피스</option>
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            size="lg"
            onChange={productStateHandler}
            className="mb-3"
            value={productState}
          >
            <option>판매상태 선택</option>
            <option value="판매중">판매중</option>
            <option value="예약중">예약중</option>
            <option value="판매완료">판매완료</option>
          </Form.Select>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="가격"
              size="lg"
              value={price}
              onChange={priceHandler}
              className="mb-3"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="게시글 내용을 작성해주세요."
              size="lg"
              value={contents}
              onChange={contentsHandler}
              className="mb-3"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default WriteComponent;
