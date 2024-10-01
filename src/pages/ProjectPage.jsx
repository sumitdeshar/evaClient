import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProjectList from "../components/project/ProjectList";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
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
      <Container className="text-center">
        <Button
          variant="primary"
          className="mb-4"
          onClick={() => navigate("/addproject")}
        >
          Add a new Project
        </Button>
        <ProjectList project={project} />
      </Container>
    </>
  );
}
