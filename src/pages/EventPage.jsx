import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Event from "../components/event/Event";
import "../App.css";

export default function EventPage() {
  const { projectId } = useParams();
  console.log(projectId);

  return (
    <>
      <Header />
      <div className="container">
        {/* <div className="top-content">
          <Sidebar projectId={projectId} />
        </div> */}
        <div className="event-list">
          <Event projectId={projectId} />
        </div>
      </div>
    </>
  );
}
