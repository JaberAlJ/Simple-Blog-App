import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ShareBlog from "./ShareBlog";
import Blogs from "./Blogs";

const Home = () => {
    const user = useSelector((state) => state.users.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }
    }, [user]);
    return (
        <>
            <h1>Home</h1>
            <h3>Welcome back {user.name}!</h3>
            <hr/>
            <Row>
                <Col md={4}>
                    <ShareBlog/>
                </Col>
                <Col md={8}>
                    <Blogs/>
                </Col>
            </Row>
        </>
    );
}

export default Home;