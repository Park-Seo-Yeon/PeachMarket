import React from "react";
import { Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { BsSearch, BsChat } from "react-icons/bs";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div>
      <Navbar expand={false} className={styles.navbar}>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className={styles.toggle}
        />

        <Navbar.Brand href="/">
          <img
            src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/peachmarket-logo.png"
            className={styles.logo}
            alt=""
          />
        </Navbar.Brand>

        <Nav className="flex-row">
          <Nav.Link href="/">
            <BsSearch size="24" className={styles.search} />
          </Nav.Link>
          <Nav.Link href="/">
            <BsChat size="24" className={styles.chat} />
          </Nav.Link>
        </Nav>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/peachmarket-logo.png"
                width="250px"
                alt=""
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <div>안녕하세요. 피치마켓입니다.</div>
              <Nav.Link href="/">로그인</Nav.Link>
              <NavDropdown title="카테고리" id="offcanvasNavbarDropdown" show>
                <NavDropdown.Item href="/">상의</NavDropdown.Item>
                <NavDropdown.Item href="/">아우터</NavDropdown.Item>
                <NavDropdown.Item href="/">스커트</NavDropdown.Item>
                <NavDropdown.Item href="/">팬츠</NavDropdown.Item>
                <NavDropdown.Item href="/">원피스</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/user/1">마이페이지</Nav.Link>
              <Nav.Link href="/">로그아웃</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
}

export default NavBar;
