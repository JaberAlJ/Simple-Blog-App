import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Features/UserSlice";

const Login = () => {
    const user = useSelector((state) => state.users.user);
    const isSuccess = useSelector((state) => state.users.isSuccess);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [user, isSuccess]);

    const handleSubmit = () => {
        const userData = {
            email: email,
            password: password,
        };
        dispatch(login(userData));
    };

    return (
        <Container>
            <Row>
                <h1>Login</h1>
            </Row>
            <Form>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Button  onClick={handleSubmit}>Login</Button>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;