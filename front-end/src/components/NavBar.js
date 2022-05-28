import React from "react";
import { Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { BsSearch, BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import useStore from "./useStore";

function NavBar(props) {
  const { changeCategory, setChangeCategory } = useStore();
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
          <Nav.Link href="/">
            <img
              src="https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/PeachMarketLogo.png"
              className={styles.logo}
              alt=""
            />
          </Nav.Link>
        </Navbar.Brand>

        <Nav className="flex-row">
          <Nav.Link to={"/"}>
            <BsSearch
              size="24"
              className={styles.search}
              onClick={onClickSearch}
            />
          </Nav.Link>
          {/* <Nav.Link href="/">
            <BsChat size="24" className={styles.chat} />
          </Nav.Link> */}
        </Nav>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <Nav.Link href="/">
                <img
                  src="https://peachmarket-bucket.s3.ap-northeast-2.amazonaws.com/setting/PeachMarketLogo.png"
                  width="250px"
                  alt=""
                />
              </Nav.Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {localStorage.getItem("token") === null ? (
                <div>
                  <Link to={"/login"}>
                    <p className={styles.title}>로그인</p>
                  </Link>
                  {/* <p>안녕하세요. 피치마켓입니다.</p>
                  <Link to={"./login"}>
                    <p className={styles.title}>로그인</p>
                  </Link> */}
                </div>
              ) : (
                <p className={styles.title}>{userId}님 환영합니다.</p>
              )}
              <p className={styles.title}>카테고리</p>
              {/* 카테고리 수정 */}
              {/* <NavDropdown.Item  href='#a' onClick={categoryHandleChange}>
                전체보기
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                상의
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                아우터
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                스커트
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                팬츠
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}> 
                원피스
              </NavDropdown.Item> */}
              <ul>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("0");
                    }}
                  >
                    전체보기
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("1");
                    }}
                  >
                    상의
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("2");
                    }}
                  >
                    아우터
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("3");
                    }}
                  >
                    스커트
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("4");
                    }}
                  >
                    팬츠
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setChangeCategory("5");
                    }}
                  >
                    원피스
                  </li>
                </Link>
              </ul>
              {localStorage.getItem("token") === null ? (
                ""
              ) : (
                <div>
                  <Link to={"/mypage"}>
                    <p className={styles.title}>마이페이지</p>
                  </Link>
                  <a
                    className={styles.title}
                    onClick={() => {
                      localStorage.clear();
                    }}
                    href="/"
                  >
                    로그아웃
                  </a>
                </div>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
}

export default NavBar;
