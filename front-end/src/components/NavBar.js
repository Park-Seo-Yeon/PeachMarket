import React, { useState } from "react";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import { BsSearch, BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import useStore from "./useStore";

function NavBar(props) {
  const { changeCategory, setChangeCategory } = useStore();
  const { userId, setUserId } = useStore();
  const [isShown, setIsShown] = useState(false);

  const onClickSearch = () => {
    const searchStatus = props.searchStatus;
    props.onChange(!searchStatus);
  };

  const onClickToggle = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <Navbar expand={false} className={styles.navbar}>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className={styles.toggle}
          onClick={onClickToggle}
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
          {/* <Nav.Link href="/chat">
            <BsChat size="24" className={styles.chat} />
          </Nav.Link> */}
        </Nav>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className={styles.offcanvas}
          show={isShown}
          onHide={() => {
            setIsShown(false);
          }}
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
                    <p className={styles.title} onClick={onClickToggle}>
                      ?????????
                    </p>
                  </Link>
                  {/* <p>???????????????. ?????????????????????.</p>
                  <Link to={"./login"}>
                    <p className={styles.title}>?????????</p>
                  </Link> */}
                </div>
              ) : (
                <p className={styles.title}>{userId}??? ???????????????.</p>
              )}
              <p className={styles.title}>????????????</p>
              {/* ???????????? ?????? */}
              {/* <NavDropdown.Item  href='#a' onClick={categoryHandleChange}>
                ????????????
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                ??????
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                ?????????
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                ?????????
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}>
                ??????
              </NavDropdown.Item>
              <NavDropdown.Item onClick={categoryHandleChange}> 
                ?????????
              </NavDropdown.Item> */}
              <ul>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("0");
                    }}
                  >
                    ????????????
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("1");
                    }}
                  >
                    ??????
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("2");
                    }}
                  >
                    ?????????
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("3");
                    }}
                  >
                    ?????????
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("4");
                    }}
                  >
                    ??????
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      onClickToggle();
                      setChangeCategory("5");
                    }}
                  >
                    ?????????
                  </li>
                </Link>
              </ul>
              {localStorage.getItem("token") === null ? (
                ""
              ) : (
                <div>
                  <Link to={"/mypage"}>
                    <p className={styles.mypage} onClick={onClickToggle}>
                      ???????????????
                    </p>
                  </Link>
                  <a
                    className={styles.title}
                    onClick={() => {
                      localStorage.clear();
                    }}
                    href="/"
                  >
                    ????????????
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
