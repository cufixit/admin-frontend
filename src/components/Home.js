import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

const Home = () => {
    let navigate = useNavigate();
    const viewGroups = () => {
        navigate(`/groups`);
    }
    const viewReports = () => {
        navigate(`/reports`);
    }

    return (
        <div className="d-grid gap-2">
          <Button onClick={viewGroups} variant="primary" size="lg">
            View Groups
          </Button>
          <Button onClick={viewReports} variant="secondary" size="lg">
            View Reports
          </Button>
        </div>
    ); 
}

export default Home;