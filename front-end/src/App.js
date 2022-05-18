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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jwtToken") === null) {
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    }
  });
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
