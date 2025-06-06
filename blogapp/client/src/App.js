import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {Container, Row} from "reactstrap";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Footer from "./Components/Footer";

function App() {
  return (
    <Container>
      <Router>
        <Row>
          <Header/>
        </Row>
        <Row>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </Row>
        <Row>
          <Footer/>
        </Row>
      </Router>
    </Container>
  );
}

export default App;
