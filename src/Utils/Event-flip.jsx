import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Form } from "react-bootstrap";
import { API_BASE_URL } from "./api";
import "./event-flip.css";

export default function EventDetails(prop) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

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
              <Col key={event.id} md={4} className="mb-4">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img
                        src="https://picsum.photos/1000/720"
                        // src={event.imageUrl || "placeholder.jpg"}
                        alt={`Event ${event.id}`}
                        className="event-image"
                      />
                    </div>
                    <div className="flip-card-back">
                      <h5>Event ID: {event.id}</h5>
                      <p>Vehicle ID: {event.vehicle_id}</p>
                      <p>Date: {formatDate(event.created_at)}</p>{" "}
                      <p>Time: {formatTime(event.created_at)}</p>{" "}
                      {/* Formatted timestamp */}
                    </div>
                  </div>
                </div>
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
