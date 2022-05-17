import React from "react";
import { Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { BsSearch, BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import useStore from "./useStore";

function NavBar(props) {
  const { category, setCategory } = useStore();
  const { userId, setUserId } = useStore();
  const onClickSearch = () => {
    const searchStatus = props.searchStatus;
    props.onChange(!searchStatus);
  };
  return (
    <div>
      <Navbar expand={false} className={styles.navbar}>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className={styles.toggle}
        />

        <Navbar.Brand>
          <Link to={"./"}>
            <img
              src="https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/PeachMarketLogo.png"
              className={styles.logo}
              alt=""
            />
          </Link>
        </Navbar.Brand>

        <Nav className="flex-row">
          <Nav.Link to={"./"}>
            <BsSearch
              size="24"
              className={styles.search}
              onClick={onClickSearch}
            />
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
                src="https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/PeachMarketLogo.png"
                width="250px"
                alt=""
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <div>안녕하세요. 피치마켓입니다.</div>

              {userId === null ? (
                <Link to={"./login"}>
                  <p className={styles.title}>로그인</p>
                </Link>
              ) : (
                <p className={styles.title}>환영합니다. {userId}님</p>
              )}
              <p className={styles.title}>카테고리</p>

              <NavDropdown.Item
                onClick={() => {
                  setCategory("0");
                }}
              >
                전체보기
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setCategory("2");
                }}
              >
                상의
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setCategory("1");
                }}
              >
                아우터
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setCategory("3");
                }}
              >
                스커트
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setCategory("4");
                }}
              >
                팬츠
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setCategory("5");
                }}
              >
                원피스
              </NavDropdown.Item>
              <Nav.Link href="/user/1">
                <p className={styles.title}>마이페이지</p>
              </Nav.Link>
              <Nav.Link href="/">
                <p className={styles.title}>로그아웃</p>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
}

export default NavBar;
