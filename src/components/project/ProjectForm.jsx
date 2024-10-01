import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Button, Container } from "react-bootstrap";

export default function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const navigate = useNavigate();

  const projectFormApi = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/create_project`,
        {
          name: projectName,
          location: projectLocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Project created successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!projectName) return;
    projectFormApi();
    setProjectName("");
    setProjectLocation("");
    navigate("/home");
  }

  return (
    <>
      <Header />
      <Container className="form-container mt-5">
        <Form className="custom-form" onSubmit={handleSubmit}>
          <Form.Group controlId="project-name" className="mb-3">
            <Form.Label>Project Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location" className="mb-4">
            <Form.Label>Project Location:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project location"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="custom-button">
            Save Project
          </Button>
        </Form>
      </Container>
    </>
  );
}
