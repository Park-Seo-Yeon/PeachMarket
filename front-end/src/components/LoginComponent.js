import { Form, Col, Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Login.module.css";
import useStore from "./useStore";

import ProductService from "../service/ProductService";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginComponent() {
  const { userId, setUserId } = useStore();
  const { userToken, setUserToken } = useStore();

  const { isLoggedIn, setIsLoggedIn } = useStore();
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const idHandler = (e) => {
    setId(e.target.value);
  };

  const [pw, setPw] = useState("");

  const pwHandler = (e) => {
    setPw(e.target.value);
  };

  const onClickLogin = () => {
    let userInfo = {
      userId: id,
      password: pw,
    };

    ProductService.login(userInfo)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("jwtToken", token);

        localStorage.setItem("loginId", id);
        setIsLoggedIn(true);
        Swal.fire({
          text: "로그인에 성공했습니다",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        });

        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          text: "로그인에 실패했습니다",
          confirmButtonColor: "#fea5ab",
          confirmButtonText: "확인",
          width: "350px",
        })
      );
  };
  return (
    <div className={styles.container}>
      <Stack gap={2} className="col-sm-4 mx-auto">
        <p className={styles.loginText}>LOGIN</p>
        <Form.Group>
          <Form.Control type="text" placeholder="ID" onChange={idHandler} />

          <Form.Control
            type="password"
            placeholder="PW"
            onChange={pwHandler}
            className={styles.loginForm}
          />
        </Form.Group>
        <Button className={styles.loginBtn} onClick={onClickLogin}>
          LOGIN
        </Button>
      </Stack>
    </div>
  );
}

export default LoginComponent;
