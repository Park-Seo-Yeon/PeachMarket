import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { Form } from "react-bootstrap";
import styles from "./Write.module.css";

import { Link, useNavigate } from "react-router-dom";
import ProductService from "../service/ProductService";

function WriteComponent() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

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
  const [contents, setContetns] = useState(""); // 수정
  const [pictureUrl, setPictureUrl] = useState(""); // 이미지? 

  const articleHandler = (e) => {
    e.preventDefault();
    setContetns(e.target.value);
  };

  const onClickCancel = () => {
    navigate("/");
  };

  const onClickOk = () => {
    console.log(body);
    ProductService.createProducts(body).then((res)=>{
      navigate("/");
    });
  };

  let body = {
    pictureUrl: pictureUrl,
    title: title,
    category: category,
    price: price,
    contents: contents,
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
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
              className={styles.file_container_upload}
            />

            <div className={styles.file_container_uploadImg}>
              <p>{imageSrc && <img src={imageSrc} alt="" />}</p>
              <p>{imageSrc && <img src={imageSrc} alt="" />}</p>
              <p>{imageSrc && <img src={imageSrc} alt="" />}</p>
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
              value={contents}
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
