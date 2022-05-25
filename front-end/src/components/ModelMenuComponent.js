import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import ProductService from "../service/ProductService";
import styles from "./Menu.module.css";

function ModelMenuComponent() {
  const [imgBase64, setImgBase64] = useState(""); //미리보기
  const [imgFile, setImgFile] = useState(null);
  const [modelImg, setModelImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [user, setUser] = useState([]);

  ProductService.getMyPage().then((res) => {
    setUser(res.data);
  });

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

  const onClickInputFile = () => {
    document.getElementById("inputFile").click();
    setIsShown(true);
    setImgBase64("");
  };

  const onClickCreateModel = async (e) => {
    e.preventDefault();
    e.persist();
    setLoading(true);
    setIsShown(false);

    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("gender", user.gender);
    formData.append("height", user.height);
    formData.append("weight", user.weight);
    formData.append("id", user.userId);

    try {
      const postSurvey = await axios.post(
        "http://localhost:5000/model",
        formData
      );
      setModelImg(postSurvey.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      Swal.fire({
        text: "모델 생성에 실패했습니다",
        confirmButtonColor: "#fea5ab",
        confirmButtonText: "확인",
        width: "350px",
      });
    }
  };

  return (
    <div>
      <div className={styles.title_noTab}>개인모델</div>
      <div className={styles.model_container}>
        <div className={styles.btn}>
          <input
            type="file"
            id="inputFile"
            onChange={handleChangeFile}
            className={styles.inputFile}
          />
          <button onClick={onClickInputFile}>사진 업로드하기</button>
          <button onClick={onClickCreateModel}>모델 생성하기</button>
        </div>
        {user.modelImg !== null ? (
          <div className={imgFile === null ? styles.uploadImg : styles.hidden}>
            <img src={user.modelImg}></img>
          </div>
        ) : (
          ""
        )}
        {isShown ? (
          <div className={styles.uploadImg}>
            <p>{imgFile && <img src={imgBase64} alt="" />}</p>
          </div>
        ) : loading ? (
          <div className={styles.loading_container}>
            <Spinner
              animation="border"
              style={{ color: "#fea5ab" }}
              className={styles.loading_spinner}
            />
            <p className={styles.loading_text}>모델 생성 중</p>
          </div>
        ) : (
          <div className={styles.uploadImg}>
            <p>{imgFile && <img src={modelImg} alt="" />}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelMenuComponent;
