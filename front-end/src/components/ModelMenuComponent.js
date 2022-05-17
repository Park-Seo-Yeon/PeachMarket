import axios from "axios";
import React, { useState } from "react";
import styles from "./Menu.module.css";

function ModelMenuComponent() {
  const [imgBase64, setImgBase64] = useState(""); //미리보기
  const [imgFile, setImgFile] = useState(null);
  const [modelImg, setModelImg] = useState(null);

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
  };

  const onClickCreateModel = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("file", imgFile);
    // const postSurvey = await axios({
    //   method: "POST",
    //   url: "http://localhost:5000/createModel",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: formData,
    // });
    try{
      const postSurvey = await axios.post(
        "http://localhost:5000/createModel",
        formData
      )
    console.log(postSurvey.data);
    setModelImg(postSurvey.data);
    }
    catch{

    }
  };

  return (
    <div>
      <div className={styles.title_noTab}>개인모델</div>
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
      <div className={styles.uploadImg}>
        <p>{imgFile && <img src={modelImg} alt="" />}</p>
      </div>
    </div>
  );
}

export default ModelMenuComponent;
