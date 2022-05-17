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
import ModelMenuComponent from "./components/ModelMenuComponent";
import { useState } from "react";

function App() {
  const [searchStatus, setSearchStatus] = useState(false);
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
            <Route path="/user/:userId" element={<UserComponent />} />
            <Route path="/write/:productId" element={<WriteComponent />} />
            <Route path="/profile/:userId" element={<ProfileComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/createModel" element={<ModelMenuComponent />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;
