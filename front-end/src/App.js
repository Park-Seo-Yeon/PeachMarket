import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";
import ProductComponent from "./components/ProductComponent";
import UserComponent from "./components/UserComponent";
import WriteComponent from "./components/WriteComponent";
import ProfileComponent from "./components/ProfileComponent";
import LoginComponent from "./components/LoginComponent";
import { useEffect, useState } from "react";
import useStore from "./components/useStore";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStore();

  const { userId, setUserId } = useStore();
  const { userToken, setUserToken } = useStore();
  const { userRefreshToken, setUserRefreshToken } = useStore();
  const [searchStatus, setSearchStatus] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("jwtToken") === null) {
  //     console.log(isLoggedIn);
  //   } else {
  //     setIsLoggedIn(true);
  //     console.log(isLoggedIn);
  //   }
  // }, []);

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // 수정한 부분
  // 원래는 토큰 하나만 받아와서 로컬 스토리지에 저장했다면 이제는 2개를 받아옴 
  ///////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////// 
  useEffect(() => {
    if (localStorage.getItem("token") != null 
      && localStorage.getItem("refreshToken") != null) {
      setIsLoggedIn(true);
    }
    
    setUserToken(localStorage.getItem("token"));
    setUserRefreshToken(localStorage.getItem("refreshToken"));
    setUserId(localStorage.getItem("loginId"));
  }, []);

  return (
    <Container>
      <Router>
        <NavBar
          searchStatus={searchStatus}
          onChange={(newStatus) => setSearchStatus(newStatus)}
        />
        <div>
          <Routes>
            <Route
              path="/"
              element={<MainComponent searchStatus={searchStatus} />}
            />
            <Route path="/products/:productId" element={<ProductComponent />} />
            <Route
              path="/mypage"
              element={isLoggedIn ? <UserComponent /> : <LoginComponent />}
            />
            <Route
              path="/write/:productId"
              element={isLoggedIn ? <WriteComponent /> : <LoginComponent />}
            />
            <Route
              path="/profile/:userId"
              element={isLoggedIn ? <ProfileComponent /> : <LoginComponent />}
            />
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;
