import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AccountContext } from "./AccountContext";
// import AWS from 'aws-sdk';
// import apigClientFactory from '../sdk/apigClient';

const New = () => {
  // var sdk = apigClientFactory.newClient();
  const { session } = useContext(AccountContext);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState();
  const [uploadSuccess, setUploadSuccess] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(files);
    var fileLength = 0;
    if (files) {
      setUploadSuccess("You have uploaded file(s).");
      fileLength = files.length;
    } else {
      setUploadSuccess("No file has been uploaded.");
    }

    const submission = {
      title: title.trim(),
      location: location,
      description: description.trim(),
      numImages: fileLength,
    };
    console.log(submission);

    // sdk.reportPost();
  };

  return (
    <Container>
      <h1>New Report</h1>
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="issueTitle">
            <Form.Label>Issue Title</Form.Label>
            <Form.Control
              type="title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter issue title"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Select
              defaultValue="Wien Hall"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option>Wien Hall</option>
              <option>Broadway Hall</option>
              <option>Mudd</option>
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
              placeholder="Give a detailed description of what the issue is."
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="imgs">
            <Form.Label>Upload images</Form.Label>
            <br />
            <input
              onChange={(event) => setFiles(event.target.files)}
              type="file"
              name="file"
              multiple
            />
          </Form.Group>
        </Row>
        <div>{uploadSuccess}</div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default New;
