import { Form, Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Login.module.css";
import useStore from "./useStore";

import ProductService from "../service/ProductService";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginComponent() {
  const { userId, setUserId } = useStore();
  const { userToken, setUserToken } = useStore();
  const { userRefreshToken, setUserRefreshToken } = useStore();

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
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // 수정한 부분
        // 로그인 시, 액세스 토큰과 재발급을 위한 리프레쉬 토큰을 함께 받는다.
        // 리프레쉬 토큰은 DB 유저테이블에 따로 저장 중이고
        // 이후에 로그인 인증이 필요한 요청이 오면 /refresh로 토큰과 리프레쉬 토큰을 헤더에 담아서 보내는데
        // 이때 보내진 리프레쉬 토큰과 DB에 저장되어있는 리프레쉬 토큰 값이 같을 경우에만 토큰을 재발급 해주는 식으로 코드를 짬
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        const token = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        console.log(res.data);
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("loginId", id);
        setUserToken(token);
        setUserRefreshToken(refreshToken);
        setUserId(id);
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
