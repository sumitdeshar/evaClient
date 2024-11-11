import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Input, Button, message, Typography } from "antd";

const { Title } = Typography;

export default function AddCameraForm() {
  const { state } = useLocation();
  const project = state?.project || {};
  const [projectId] = useState(project.id);
  const [cameraName, setCameraName] = useState("");
  const [resolution, setResolution] = useState("1920*1020");
  const navigate = useNavigate();

  const cameraAddApi = async () => {
    try {
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
      message.success("Camera added successfully");
      navigate(`/viewproject`, { state: { project: project } });
    } catch (error) {
      console.error("Error adding camera:", error);
      message.error("Failed to add camera");
    }
  };

  const handleAddCameraSubmit = () => {
    if (!cameraName || !resolution) return;
    cameraAddApi();
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Title level={3} className="text-center">
          Add Camera
        </Title>
        <Form
          layout="vertical"
          onFinish={handleAddCameraSubmit}
          className="form-container mt-4"
        >
          <Form.Item
            label="Camera Name"
            name="cameraName"
            rules={[{ required: true, message: "Please enter camera name" }]}
          >
            <Input
              placeholder="Enter camera name"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Camera Resolution"
            name="resolution"
            initialValue={resolution}
            rules={[{ required: true, message: "Please enter resolution" }]}
          >
            <Input
              placeholder="Enter camera resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
