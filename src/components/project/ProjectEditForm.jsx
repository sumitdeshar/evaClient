import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Button, Container } from "react-bootstrap";

export default function ProjectEditForm() {
  const { state } = useLocation();
  const project = state?.project || {};
  const [projectName, setProjectName] = useState(project.name || "");
  const [projectLocation, setProjectLocation] = useState(
    project.location || ""
  );
  const navigate = useNavigate();

  const projectEditApi = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/update_project/${project.id}`,
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
      console.log("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!projectName) return;
    projectEditApi();
    navigate(`/projects/${project.id}`);
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
            Save Changes
          </Button>
        </Form>
      </Container>
    </>
  );
}
