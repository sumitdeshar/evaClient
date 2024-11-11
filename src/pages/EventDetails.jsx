import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Row, Col, Image, Card, Typography } from "antd";
import Header from "../components/Header";
import "../App.css";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function EventDetails() {
  const location = useLocation();
  const { event } = location.state || {};
  const navigate = useNavigate();

  function handleImageGallery() {
    navigate("ImageGallery");
  }

  return (
    <Layout>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Title level={1} style={{ textAlign: "center", marginTop: "20px" }}>
          Event Details
        </Title>
        {event ? (
          <div
            className="event-details"
            style={{
              marginTop: "40px",
              padding: "20px",
              display: "flex",
              gap: "30px",
            }}
          >
            {/* Left Side - Event and Vehicle Info */}
            <div style={{ flex: 1 }}>
              <Card
                title="Event Info"
                bordered={false}
                className="event-info-card"
              >
                <p>
                  <Text strong>Event ID:</Text> {event.id}
                </p>
                <p>
                  <Text strong>Date:</Text>{" "}
                  {new Date(event.created_at).toLocaleDateString()}
                </p>
                <p>
                  <Text strong>Time:</Text>{" "}
                  {new Date(event.created_at).toLocaleTimeString()}
                </p>
                <p>
                  <Text strong>Type:</Text>{" "}
                  {event.type ? "Arriving" : "Leaving"}
                </p>
              </Card>

              <Card
                title="Vehicle Info"
                bordered={false}
                className="vehicle-info-card"
                style={{ marginTop: "20px" }}
              >
                <p>
                  <Text strong>Vehicle ID:</Text> {event.vehicle_id}
                </p>
                <p>
                  <Text strong>Speed:</Text> {event.vehicle.speed_kph} km/h
                </p>
                <p>
                  <Text strong>Axles:</Text> {event.vehicle.num_axle}
                </p>
                <p>
                  <Text strong>Loaded:</Text>{" "}
                  {event.vehicle.is_loaded ? "Yes" : "No"}
                </p>
              </Card>
            </div>

            {/* Right Side - Event Images */}
            <div style={{ flex: 2 }}>
              <Card
                title="Event Images"
                bordered={false}
                className="event-images-card"
              >
                <Row gutter={[16, 16]} justify="center">
                  {event.event_images && event.event_images.length > 0 ? (
                    event.event_images.map((img, idx) => (
                      <Col xs={24} key={idx}>
                        <Image
                          src={img.url}
                          alt={`Event ${event.id}`}
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px", // Fixed height for consistency
                            objectFit: "cover",
                          }}
                          onClick={handleImageGallery}
                        />
                      </Col>
                    ))
                  ) : (
                    // Placeholder images in the same style
                    <>
                      <Col xs={24}>
                        <Image
                          src="https://picsum.photos/600/500"
                          alt="Placeholder 1"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "cover",
                          }}
                          onClick={handleImageGallery}
                        />
                      </Col>
                      <Col xs={24}>
                        <Image
                          src="https://picsum.photos/600/501"
                          alt="Placeholder 2"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "cover",
                          }}
                          onClick={handleImageGallery}
                        />
                      </Col>
                      <Col xs={24}>
                        <Image
                          src="https://picsum.photos/600/502"
                          alt="Placeholder 3"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "cover",
                          }}
                          onClick={handleImageGallery}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </div>
          </div>
        ) : (
          <Text
            type="secondary"
            style={{ textAlign: "center", display: "block", marginTop: "20px" }}
          >
            No event data available.
          </Text>
        )}
      </Content>
    </Layout>
  );
}
