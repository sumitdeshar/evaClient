import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Card, Typography, Image, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import "../App.css";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function EventDetails() {
  const location = useLocation();
  const { event } = location.state || {};

  // State for modal and current image
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open modal and set current image
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Navigate to next image
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % event.event_images.length
    );
  };

  // Navigate to previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? event.event_images.length - 1 : prevIndex - 1
    );
  };

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
                  <Text strong>Camera ID:</Text> {event.camera_id}
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
                  <Text strong>Event Type:</Text> {event.event_type}
                </p>
                <p>
                  <Text strong>Flagged:</Text> {event.flagged ? "Yes" : "No"}
                </p>
              </Card>

              <Card
                title="Vehicle Info"
                bordered={false}
                className="vehicle-info-card"
                style={{ marginTop: "20px" }}
              >
                {event.event_vehicle && (
                  <>
                    <p>
                      <Text strong>Vehicle ID:</Text> {event.event_vehicle.id}
                    </p>
                    <p>
                      <Text strong>Speed:</Text> {event.event_vehicle.speed_kph}{" "}
                      km/h
                    </p>
                    <p>
                      <Text strong>Axles:</Text> {event.event_vehicle.num_axle}
                    </p>
                    <p>
                      <Text strong>Loaded:</Text>{" "}
                      {event.event_vehicle.is_loaded ? "Yes" : "No"}
                    </p>
                    <p>
                      <Text strong>Arrival Status:</Text>{" "}
                      {event.event_vehicle.arrival_status}
                    </p>
                  </>
                )}
              </Card>
            </div>

            {/* Right Side - Event Images */}
            <div style={{ flex: 2 }}>
              <Card
                title="Event Images"
                bordered={false}
                className="event-images-card"
              >
                {event.event_images && event.event_images.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {event.event_images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img.image_path}
                        alt={`Event ${event.id} - Image ${img.image_no}`}
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          objectPosition: "center",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handleImageClick(idx)}
                      />
                    ))}
                  </div>
                ) : (
                  <Text
                    type="secondary"
                    style={{ textAlign: "center", display: "block" }}
                  >
                    No images available
                  </Text>
                )}
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

        {/* Image Modal Carousel */}
        {event && event.event_images && event.event_images.length > 0 && (
          <Modal
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width="80%"
            centered
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ position: "relative", textAlign: "center" }}>
              <Image
                src={event.event_images[currentImageIndex].image_path}
                alt={`Event ${event.id} - Image ${event.event_images[currentImageIndex].image_no}`}
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                }}
                preview={false}
              />
              {event.event_images.length > 1 && (
                <>
                  <div
                    onClick={handlePrevImage}
                    style={{
                      position: "absolute",
                      left: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "2rem",
                      color: "white",
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  >
                    <LeftOutlined />
                  </div>
                  <div
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      right: 20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontSize: "2rem",
                      color: "white",
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  >
                    <RightOutlined />
                  </div>
                </>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Image {currentImageIndex + 1} of {event.event_images.length}
              </div>
            </div>
          </Modal>
        )}
      </Content>
    </Layout>
  );
}
