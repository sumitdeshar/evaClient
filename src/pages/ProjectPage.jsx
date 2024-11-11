import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProjectList from "../components/project/ProjectList";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Utils/api";

export default function ProjectDisplay() {
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_project`);
      setProject(response.data);
      console.log("Data received:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/addproject")}
        >
          Add a new Project
        </Button>
        <ProjectList project={project} />
      </div>
    </>
  );
}
