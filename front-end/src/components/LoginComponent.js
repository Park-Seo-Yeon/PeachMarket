import { Form, Col, Button, Stack } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Login.module.css";

import ProductService from "../service/ProductService";

import { Link, useNavigate } from "react-router-dom";

function LoginComponent() {
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
    console.log(id);
    console.log(pw);
    let userInfo = {
      id: id,
      pw: pw,
    };

    ProductService.login(userInfo).then(res=>{
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
    })
    navigate("/");
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
