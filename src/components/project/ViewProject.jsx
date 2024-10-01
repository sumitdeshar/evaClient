import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../Utils/api";
import "../../App.css";

export default function ViewProjectDetails() {
  const location = useLocation();
  const project = location.state?.project;
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProject = async () => {
    if (!project) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${project.id}/get_cameras`
      );
      setCameras(response.data);
      console.log("Data received:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch camera details.");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [project]);

  const handleEditProject = () => {
    navigate("/editproject", { state: { project: project } });
  };

  const handleAddCamera = () => {
    navigate("/addcamera", { state: { project: project } });
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 position-relative">
          <h1 className="text-primary">Project Details</h1>
          <button className="edit-icon-button" onClick={handleEditProject}>
            <FontAwesomeIcon icon={faEdit} />
          </button>

          {project ? (
            <ul className="list-unstyled">
              <li>
                <strong>ID:</strong> {project.id}
              </li>
              <li>
                <strong>Name:</strong> {project.name}
              </li>
              <li>
                <strong>Location:</strong> {project.location}
              </li>
            </ul>
          ) : (
            <p>No project information available.</p>
          )}
        </Card>
        <br />
        <h2 className="text-primary">Camera Details</h2>
        <Button
          className="custom-button"
          variant="info"
          onClick={handleAddCamera}
        >
          Add Camera
        </Button>
        {error && <p className="text-danger">{error}</p>}
        {cameras.length > 0 ? (
          <Row>
            {cameras.map((camera) => (
              <Col key={camera.id} md={6} lg={4} className="mb-4">
                <Card className="camera-card p-3">
                  <Card.Body>
                    <Card.Title>{camera.name}</Card.Title>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Camera ID:</strong> {camera.id}
                      </li>
                      <li>
                        <strong>Resolution:</strong> {camera.resolution}
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No cameras found for this project.</p>
        )}
      </Container>
    </>
  );
}
