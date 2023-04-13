import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { AccountContext } from "./AccountContext";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { session, login } = useContext(AccountContext);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log("Failed to log in", err);
    }
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          <p> {error} </p>
        </Alert>
      )}
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
