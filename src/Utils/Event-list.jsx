import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Form, Card, Image } from "react-bootstrap";
import { API_BASE_URL } from "./api";
import "./event.css";

export default function EventDetails(prop) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Fetching cameras
  const fetchCameras = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${prop.projectId}/get_cameras`
      );
      setCameras(response.data);
    } catch (err) {
      console.error(`Error fetching cameras:${error}`, err);
      setError("Failed to fetch cameras.");
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  // Fetching events based on selected camera
  const fetchEvents = async () => {
    if (!selectedCamera) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${selectedCamera}/events`
      );
      setEvents(response.data.event);
      console.log(response.data.event);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events.");
    }
  };

  useEffect(() => {
    if (selectedCamera) {
      fetchEvents();
    }
  }, [selectedCamera]);

  const handleCameraChange = (event) => {
    const cameraId = event.target.value;
    setSelectedCamera(cameraId);
    console.log(`Selected camera updated to: ${cameraId}`);
  };

  // Formatting date and time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} `;
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString()}`;
  };

  return (
    <Container className="event-container mt-4">
      <Form.Group controlId="cameraSelect" className="mb-4">
        <Form.Label>Select Camera</Form.Label>
        <Form.Control
          as="select"
          value={selectedCamera || ""}
          onChange={handleCameraChange}
        >
          <option value="">Select a camera...</option>
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {selectedCamera ? (
        <Row className="event-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <Col key={event.id} md={12} className="mb-4">
                <Card className="h-100 shadow-sm event-list-item">
                  <Row noGutters>
                    <Col md={4}>
                      <Image
                        src="https://picsum.photos/1000/720"
                        // src={event.imageUrl || "placeholder.jpg"}
                        alt={`Event ${event.id}`}
                        className="event-image"
                        fluid
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>Event ID: {event.id}</Card.Title>
                        <Card.Text>
                          <strong>Vehicle ID:</strong> {event.vehicle_id}
                        </Card.Text>
                        <Card.Text>
                          <strong>Date:</strong> {formatDate(event.created_at)}
                        </Card.Text>
                        <Card.Text>
                          <strong>Time:</strong> {formatTime(event.created_at)}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <p>No events found for the selected camera.</p>
          )}
        </Row>
      ) : (
        <p>Please select a camera to view its events.</p>
      )}
    </Container>
  );
}
