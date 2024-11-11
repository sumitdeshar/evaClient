import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import EventList from "../components/event/EventList";
import "../App.css";
import CameraSelectionForm from "../components/event/CameraSelectionForm";

export default function EventPage() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [eventsPerPage, setEventsPerPage] = useState();
  const { projectId } = useParams();
  console.log(projectId);

  return (
    <>
      <Header />
      <div className="container">
        <CameraSelectionForm
          projectId={projectId}
          selectedCamera={selectedCamera}
          setSelectedCamera={setSelectedCamera}
          setEventsPerPage={setEventsPerPage}
        />
        <EventList
          selectedCamera={selectedCamera}
          eventsPerPage={eventsPerPage}
          projectId={projectId}
        />
      </div>
    </>
  );
}
