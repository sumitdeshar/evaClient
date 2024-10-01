import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Card, Col, Container, Form } from "react-bootstrap";
import { API_BASE_URL } from "../../Utils/api";
import "../../App.css";

export default function EventDetails(prop) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

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
    // setEvents([]);
  };

  return (
    <>
      <Container className="mt-4">
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
          <>
            <Row>
              {events.length > 0 ? (
                events.map((event) => (
                  <Col key={event.id} md={6} lg={4} className="mb-4">
                    <Card className="event-card">
                      <Card.Body>
                        <Card.Title>Event ID: {event.id}</Card.Title>
                        <Card.Text>Vehicle ID: {event.vehicle_id}</Card.Text>
                        <Card.Text>Timestamp: {event.created_at}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No events found for the selected camera.</p>
              )}
            </Row>
          </>
        ) : (
          <p>Please select a camera to view its events.</p>
        )}
        <p>{events?.events?.message}</p>
      </Container>
    </>
  );
}
