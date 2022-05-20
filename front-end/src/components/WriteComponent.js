import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { Form } from "react-bootstrap";
import styles from "./Write.module.css";
import axios from "axios";
import $ from "jquery"; // jQuery 사용을 위해 추가

import { Link, useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/ProductService";
import Swal from "sweetalert2";

function WriteComponent() {
  const navigate = useNavigate();
  const productId = useParams().productId;

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
          //url: "http://43.200.34.51:8080/api/products",
          url: "http://localhost:8080/api/products/create",
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          data: formData,
        });
        console.log(blob);
        console.log(postSurvey);
        navigate("/");
      } catch {
        Swal.fire({
          text: "사진, 제목, 카테고리, 내용, 가격은 필수 입력 항목이에요",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });
      }
    } else {
      try {
        formData.append("data", blob);
        const putSurvey = await axios({
          method: "PUT",
          // url: `http://43.200.34.51:8080/api/products/${productId}`,
          url: "http://localhost:8080/api/products/edit/" + productId,
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          data: formData,
        });
        console.log(blob);
        console.log(putSurvey);
        navigate(`/products/${productId}`);
      } catch {
        Swal.fire({
          text: "사진, 제목, 카테고리, 내용, 가격은 필수 입력 항목이에요",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });
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
