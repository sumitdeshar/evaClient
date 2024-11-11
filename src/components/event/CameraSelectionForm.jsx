import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Select, Typography } from "antd";
import { API_BASE_URL } from "../../Utils/api";

const { Option } = Select;
const { Title } = Typography;

export default function CameraSelectionForm(prop) {
  const { projectId, selectedCamera, setSelectedCamera, setEventsPerPage } =
    prop;
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/${projectId}/get_cameras`
        );
        setCameras(response.data.cameras);
        setEventsPerPage(response.data.project_cofig.events_per_page);
      } catch (err) {
        console.error("Error fetching cameras:", err);
      }
    };
    fetchCameras();
  }, [projectId, setEventsPerPage]);

  const handleCameraChange = (cameraId) => setSelectedCamera(cameraId);

  return (
    <div style={{ marginTop: "24px", padding: "0 20px" }}>
      <Title level={4}>Select Camera</Title>
      <Form layout="vertical">
        <Form.Item label="Camera" name="cameraSelect">
          <Select
            placeholder="Select a camera..."
            value={selectedCamera || undefined}
            onChange={handleCameraChange}
            style={{ width: "100%" }}
          >
            {cameras.map((camera) => (
              <Option key={camera.id} value={camera.id}>
                {camera.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
