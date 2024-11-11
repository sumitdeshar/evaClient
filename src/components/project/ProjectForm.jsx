import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { Form, Input, Button, message, Typography } from "antd";

const { Title } = Typography;

export default function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const navigate = useNavigate();

  const projectFormApi = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/create_project`,
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
      message.success("Project created successfully");
      setProjectName("");
      setProjectLocation("");
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      message.error("Failed to create project");
    }
  };

  const handleSubmit = () => {
    if (!projectName || !projectLocation) return;
    projectFormApi();
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Title level={3} className="text-center">
          Create New Project
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="form-container mt-4"
        >
          <Form.Item
            label="Project Name"
            name="projectName"
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
              Save Project
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
