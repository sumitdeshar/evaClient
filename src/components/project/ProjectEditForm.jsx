import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Input, Button, message, Typography } from "antd";

const { Title } = Typography;

export default function ProjectEditForm() {
  const { state } = useLocation();
  const project = state?.project || {};
  const [projectName, setProjectName] = useState(project.name || "");
  const [projectLocation, setProjectLocation] = useState(
    project.location || ""
  );
  const navigate = useNavigate();

  const projectEditApi = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/update_project/${project.id}`,
        {
          name: projectName,
          location: projectLocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      message.error("Failed to update project");
    }
  };

  const handleSubmit = async () => {
    if (!projectName || !projectLocation) return;
    await projectEditApi();
    navigate(`/projects/${project.id}`);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Title level={3} className="text-center">
          Edit Project
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="form-container mt-4"
        >
          <Form.Item
            label="Project Name"
            name="projectName"
            initialValue={projectName}
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Project Location"
            name="projectLocation"
            initialValue={projectLocation}
            rules={[
              { required: true, message: "Please enter project location" },
            ]}
          >
            <Input
              placeholder="Enter project location"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
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
