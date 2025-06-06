import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Features/UserSlice";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const userData = {
            name: name,
            email: email,
            password: password,
        };
        dispatch(registerUser(userData));
        navigate('/login');
    };

    return (
        <Container>
            <Row>
                <h1>Registration</h1>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="name">
                                Name
                            </Label>
                            <Input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Button>Register</Button>
                </Row>
            </Form>
            <hr />
            <Row>
                <Col>
                    <p>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Registration;