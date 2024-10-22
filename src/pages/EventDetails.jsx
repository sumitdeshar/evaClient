import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Header from "../components/Header";
import "../App.css";

export default function EventDetails() {
  const location = useLocation();
  const { event } = location.state || {}; // Get event from location state
  console.log(`eventdetails: ${event}`);

  return (
    <>
      <Header />
      {event ? (
        <Container className="mt-5 p-4 bento-container">
          <Row className="justify-content-between">
            {/* Event Information */}
            <Col md={5}>
              <Card className="mb-4 event-container">
                <Card.Body>
                  <Card.Title>Event Details</Card.Title>
                  <Card.Text>
                    <strong>Event ID:</strong> {event.id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Date:</strong>{" "}
                    {new Date(event.created_at).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type:</strong> {event.type ? "Arriving" : "Leaving"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Vehicle Information */}
            <Col md={5}>
              <Card className="mb-4 vehicle-container">
                <Card.Body>
                  <Card.Title>Vehicle Details</Card.Title>
                  <Card.Text>
                    <strong>Vehicle ID:</strong> {event.vehicle_id}
                  </Card.Text>
                  <Card.Text>
                    <strong>Speed:</strong> {event.vehicle.speed_kph} km/h
                  </Card.Text>
                  <Card.Text>
                    <strong>Axles:</strong> {event.vehicle.num_axle}
                  </Card.Text>
                  <Card.Text>
                    <strong>Loaded:</strong>{" "}
                    {event.vehicle.is_loaded ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Event Images */}
          <Row className="justify-content-start mt-4">
            <Col md={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Event Images</Card.Title>
                  <Row xs={1} md={3} className="g-4">
                    {event.event_images.length > 0 ? (
                      event.event_images.map((img, idx) => (
                        <Col key={idx}>
                          <Image
                            src={img.url}
                            alt={`Event ${event.id}`}
                            fluid
                          />
                        </Col>
                      ))
                    ) : (
                      <>
                        <Col>
                          <Image
                            src="https://picsum.photos/600/500"
                            alt="Placeholder 1"
                            fluid
                          />
                        </Col>
                        <Col>
                          <Image
                            src="https://picsum.photos/600/501"
                            alt="Placeholder 2"
                            fluid
                          />
                        </Col>
                        <Col>
                          <Image
                            src="https://picsum.photos/600/503"
                            alt="Placeholder 3"
                            fluid
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>No event data available.</p>
      )}
    </>
  );
}
