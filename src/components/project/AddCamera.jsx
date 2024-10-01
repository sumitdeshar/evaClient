import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Button, Container } from "react-bootstrap";

export default function AddCameraForm() {
  const { state } = useLocation();
  const project = state?.project || {};
  const [projectId] = useState(project.id);
  console.log("AddCameraForm projectId:", projectId);
  const [cameraName, setCameraName] = useState("");
  const [resolution, setResolution] = useState("1920*1020");
  const navigate = useNavigate();

  const cameraAddApi = async () => {
    try {
      // console.log("Sending data:", {
      //   project_id: projectId,
      //   name: cameraName,
      //   resolution: resolution,
      // });

      await axios.post(
        `${API_BASE_URL}/create_camera`,
        {
          project_id: projectId,
          name: cameraName,
          resolution: resolution,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Camera added successfully");
    } catch (error) {
      console.error("Error adding camera:", error.response.data);
    }
  };

  function handleAddCameraSubmit(e) {
    e.preventDefault();
    cameraAddApi();
    navigate(`/viewproject`, { state: { project: project } });
  }

  return (
    <>
      <Header />
      <Container className="form-container mt-5">
        <Form className="custom-form" onSubmit={handleAddCameraSubmit}>
          <Form.Group controlId="camera-name" className="mb-3">
            <Form.Label>Camera Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter camera name"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="resolution" className="mb-4">
            <Form.Label>Camera Resolution:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter camera resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
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
