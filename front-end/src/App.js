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
import FittingComponent from "./components/FittingComponent";
import { useEffect, useState } from "react";
import useStore from "./components/useStore";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStore();

  const { userId, setUserId } = useStore();
  const { userToken, setUserToken } = useStore();
  const [searchStatus, setSearchStatus] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("jwtToken") === null) {
  //     console.log(isLoggedIn);
  //   } else {
  //     setIsLoggedIn(true);
  //     console.log(isLoggedIn);
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("jwtToken") != null) {
      setIsLoggedIn(true);
    }
    setUserToken(localStorage.getItem("jwtToken"));
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
            <Route
              path="/fitting"
              element={isLoggedIn ? <FittingComponent /> : <LoginComponent />}
            />
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;
