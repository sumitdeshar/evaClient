import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Utils/api";

export default function Sidebar(prop) {
  const [projectDetails, setProjectDetails] = useState();
  const pId = prop.projectId;
  console.log(`Sidebar:${pId}`);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_project/${pId}`);
      setProjectDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectDetails]);

  return <></>;
}
