import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [uni, setUni] = useState("");
    const [code, setCode] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        let attributeList = [
            new CognitoUserAttribute({
                Name: "custom:full_name", Value: name.trim()
            }),
            new CognitoUserAttribute({
                Name: "custom:uni", Value: uni.trim()
            })
        ]

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                setSuccess(err.message);
                console.error(err);
            }
            else {
                setSuccess("You have created an account successfully!");
                document.getElementById("register-btn").style.display = "none";
                document.getElementById("code").style.display = "block";
                document.getElementById("confirm-btn").style.display = "block";
            }
            console.log(data);
        });
    };

    const onVerify = (event) => {
        event.preventDefault();

        let user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        console.log(user);

        user.confirmRegistration(code, true, (err, data) => {
            if (err) {
                setSuccess(err.message);
                console.error(err);
            }
            else {
                setSuccess("You have verified your account!");
                window.location.href = "/login";
            }
        })
    };

    return (
        <Container>
            <div>Register</div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        value={name} 
                        onChange={(event) => setName(event.target.value)} 
                        type="name" 
                        placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUni">
                    <Form.Label>Uni</Form.Label>
                    <Form.Control 
                        value={uni} 
                        onChange={(event) => setUni(event.target.value)} 
                        type="name" 
                        placeholder="Enter uni" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        type="email" 
                        placeholder="Enter email address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" />
                </Form.Group>
                <Button id="register-btn" variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <Form onSubmit={onVerify}>
                <Form.Group id="code" style={{display:"none"}} className="mb-3" controlId="formCode">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                        value={code} 
                        onChange={(event) => setCode(event.target.value.trim())} 
                        type="code" 
                        placeholder="Verification code" />
                </Form.Group>
                <Button id="confirm-btn" style={{display:"none"}} variant="primary" type="submit">
                    Verify
                </Button>
            </Form>
            <div>{success}</div>
        </Container>
    );
};

export default Signup;