import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Report = () => {
    let location = useLocation();
    const data = location.state.data;
    return (
        <Container>
            <h1>#{data.id}: {data.reportTitle}</h1>
            <h2>Details</h2>
            <div>Description: {data.description}</div>
            <div>Location: {data.location}</div>
            <div>Status: {data.status}</div>
        </Container>
    )
};

export default Report;