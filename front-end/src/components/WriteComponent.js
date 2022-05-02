import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { Form } from "react-bootstrap";
import styles from "./Write.module.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import ProductService from "../service/ProductService";

function WriteComponent() {
  const navigate = useNavigate();

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
  const [price, setPrice] = useState("");

  const priceHandler = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };
  const [article, setArticle] = useState("");

  const articleHandler = (e) => {
    e.preventDefault();
    setArticle(e.target.value);
  };

  const [imgBase64, setImgBase64] = useState(""); 
  const [imgFile, setImgFile] = useState(null);	

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); 
      setImgFile(event.target.files[0]);
    }
  }

  const onClickCancel = () => {
    alert("글 작성을 취소합니다");
    navigate("/");
  };

  const onClickOk = async (e) => {

    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append('file', imgFile);

    let dataSet = {
      title: title,
      category: category,
      price: price,
      article: article,
    };

    formData.append("data", JSON.stringify(dataSet));

    const postSurvey = await axios({
      method: "POST",
      url: "http://localhost:8080/api/products",
      mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    console.log(postSurvey);
    navigate("/");
  };



  

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <IoClose size="24" onClick={onClickCancel} />
        <p className={styles.top_container_title}>중고거래 글쓰기</p>
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
          >
            <option>카테고리 선택</option>
            <option value="상의">상의</option>
            <option value="아우터">아우터</option>
            <option value="스커트">스커트</option>
            <option value="팬츠">팬츠</option>
            <option value="원피스">원피스</option>
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
              value={article}
              onChange={articleHandler}
              className="mb-3"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default WriteComponent;
