import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import ProjectDetailsCard from "./ProjectDetailsCard";
import CameraList from "./CameraList";
import { Button, Typography, message } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";

const { Title } = Typography;

export default function ViewProjectDetails() {
  const location = useLocation();
  const project = location.state?.project;
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProject = async () => {
    if (!project) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${project.id}/get_cameras`
      );
      setCameras(response.data);
      console.log("Data received:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch camera details.");
      message.error("Failed to fetch camera details.");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [project]);

  const handleEditProject = () => {
    navigate("/editproject", { state: { project: project } });
  };

  const handleAddCamera = () => {
    navigate("/addcamera", { state: { project: project } });
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <Title level={1} className="text-primary">
          Project Details
        </Title>
        <ProjectDetailsCard project={project} onEdit={handleEditProject} />

        <Title level={2} className="text-primary mt-4">
          Camera Details
        </Title>
        <Button type="primary" onClick={handleAddCamera} className="mb-4">
          Add Camera
        </Button>
        {error && <p className="text-danger">{error}</p>}
        <CameraList cameras={cameras} />
      </div>
    </>
  );
}
