import { useState } from "react";
import { Card, Button, Modal, Slider, Typography } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api.jsx";

export default function ProjectDetailsCard(prop) {
  const { project, onEdit } = prop;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configEventsPerPage, setConfigEventsPerPage] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const configApi = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/${project?.id}/change_project_config`,
        {
          events_per_page: configEventsPerPage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Project Config changed successfully", `${project.id}`);
    } catch (error) {
      console.error("Error on config API:", error);
    }
  };

  const handleSaveChanges = () => {
    setConfigEventsPerPage(sliderValue);
    configApi();
    setIsModalOpen(false);
    console.log("Saved events per page:", sliderValue);
  };

  return (
    <>
      <Card
        title="Project Details"
        extra={
          <div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={onEdit}
              style={{ color: "#1890ff" }}
            />
            <Button
              type="text"
              icon={<SettingOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{ color: "#1890ff", marginLeft: 8 }}
            />
          </div>
        }
        className="mb-4"
      >
        {project ? (
          <ul className="list-unstyled">
            <li>
              <strong>ID:</strong> {project.id}
            </li>
            <li>
              <strong>Name:</strong> {project.name}
            </li>
            <li>
              <strong>Location:</strong> {project.location}
            </li>
          </ul>
        ) : (
          <p>No project information available.</p>
        )}
      </Card>

      {/* Modal for Settings */}
      <Modal
        title="Configuration Settings"
        visible={isModalOpen}
        onOk={handleSaveChanges} // Save changes on "OK"
        onCancel={() => setIsModalOpen(false)} // Close modal on "Cancel"
        okText="Save"
        cancelText="Cancel"
      >
        <Typography.Text>Events per page:</Typography.Text>
        <Slider
          min={10}
          max={50}
          step={10}
          marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" }}
          value={sliderValue}
          onChange={handleSliderChange}
          tooltip={{ formatter: null }}
        />
      </Modal>
    </>
  );
}
