import { useState, useEffect } from "react";
import axios from "axios";
import "./event.css";
import {
  Row,
  Col,
  Container,
  Form,
  Image,
  Table,
  Button,
} from "react-bootstrap";
import { API_BASE_URL } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

export default function Event(prop) {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleEventDetailView = (event) => {
    console.log(`state from event to event details:`);
    console.log(event);
    navigate("/:eventId/eventdetail", { state: { event: event } });
  };

  return (
    <>
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
      </Container>

      {selectedCamera ? (
        events.length > 0 ? (
          <>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="filter" className="mb-4">
                    <Form.Control as="select">
                      <option value="">Filter..</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button>Filter</Button>
                </Col>
              </Row>
            </Container>

            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>Vehicle ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Speed</th>
                    <th>Loaded</th>
                    <th>Type</th>
                    <th>Vehicle Image</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      onClick={() => handleEventDetailView(event)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{event.id}</td>
                      <td>{event.vehicle_id}</td>
                      <td>{formatDate(event.created_at)}</td>
                      <td>{formatTime(event.created_at)}</td>
                      <td>{event.vehicle.speed_kph} km/h</td>
                      <td>{event.is_loaded ? "Yes" : "No"}</td>
                      <td>{event.type ? "Arriving" : "Leaving"}</td>
                      <td>
                        <Image
                          src={
                            event.event_images.length > 0
                              ? event.event_images[0].url
                              : "placeholder.jpg"
                          }
                          alt={`Event ${event.id}`}
                          width={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </>
        ) : (
          <p>No events found for the selected camera.</p>
        )
      ) : (
        <p>Please select a camera to view its events.</p>
      )}
    </>
  );
}
