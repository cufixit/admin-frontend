import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import { AccountContext } from "./Account";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    const { authenticate } = useContext(AccountContext);

    let navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
            .then(data => {
                console.log(data);
                navigate(`/home`);
            })
            .catch(err => {
                setSuccess(err.message);
                console.log("Failed to log in", err);
            });
    };

    return (
        <Container>
            <div>Login</div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value.trim())} 
                        type="email" 
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value.trim())} 
                        type="password" 
                        placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <div>{success}</div>
        </Container>
    );
};

export default Login;