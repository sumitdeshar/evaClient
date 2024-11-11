import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function ProjectDetailsCard(prop) {
  const { project, onEdit } = prop;
  return (
    <Card
      title="Project Details"
      extra={
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
          style={{ color: "#1890ff" }}
        />
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
  );
}
