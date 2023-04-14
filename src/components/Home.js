import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

const Home = () => {
  let navigate = useNavigate();
  const viewReports = () => {
    navigate("/reports");
  };
  const viewGroups = () => {
    navigate("/groups");
  };

  return (
    <Container>
      <div className="d-grid gap-2">
        <Button onClick={viewReports} variant="primary" size="lg">
          View Reports
        </Button>
        <Button onClick={viewGroups} variant="secondary" size="lg">
          View Groups
        </Button>
      </div>
    </Container>
  );
};

export default Home;
