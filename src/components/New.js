import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AccountContext } from "./AccountContext";
import { useLocation } from "react-router-dom";
// import AWS from 'aws-sdk';
// import apigClientFactory from '../sdk/apigClient';

const New = () => {
  // var sdk = apigClientFactory.newClient();
  const { session } = useContext(AccountContext);

  const data = useLocation().state.data;

  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data.status);

  const onSubmit = (event) => {
    event.preventDefault();

    const submission = {
      title: title.trim(),
      location: location,
      description: description.trim(),
      status: status,
    };
    console.log(submission);
  };

  return (
    <Container>
      <h1>New Group</h1>
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="groupTitle">
            <Form.Label>Group Title</Form.Label>
            <Form.Control
              type="title"
              onChange={(event) => setTitle(event.target.value)}
              defaultValue={data.title}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Select
              defaultValue={data.location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option>Wien Hall</option>
              <option>Broadway Hall</option>
              <option>Mudd</option>
              <option>East Campus</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(event) => setDescription(event.target.value)}
              as="textarea"
              rows={3}
              defaultValue={data.description}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              defaultValue="In progress"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option>In progress</option>
              <option>Completed</option>
              <option>Submitted</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Create Group
        </Button>
      </Form>
    </Container>
  );
};

export default New;
