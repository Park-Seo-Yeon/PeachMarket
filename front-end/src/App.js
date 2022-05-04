import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";
import ProductComponent from "./components/ProductComponent";
import UserComponent from "./components/UserComponent";
import WriteComponent from "./components/WriteComponent";
import ProfileComponent from "./components/ProfileComponent";

function App() {
  return (
    <Container>
      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/products/:productId" element={<ProductComponent />} />
            <Route path="/user/:userId" element={<UserComponent />} />
            <Route path="/write/:productId" element={<WriteComponent />} />
            <Route path="/profile/:userId" element={<ProfileComponent />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
}

export default App;
