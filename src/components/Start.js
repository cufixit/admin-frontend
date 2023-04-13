import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

const Start = () => {
    let navigate = useNavigate();
    const login = () => {
        navigate(`/login`);
    }
    const signup = () => {
        navigate(`/signup`);
    }
    
    return (
        <div className="d-grid gap-2">
          <Button onClick={login} variant="primary" size="lg">
            Login
          </Button>
          <Button onClick={signup} variant="secondary" size="lg">
            Register
          </Button>
        </div>
    );
}

export default Start;