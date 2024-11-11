import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import EventPagination from "./EventPagination";
import EventTable from "./EventTable";
// import ActionButtons from "./EventActionButtons";

export default function EventList(prop) {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const selectedCamera = prop.selectedCamera;

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * prop.eventsPerPage;
  const firstIndex = lastIndex - prop.eventsPerPage;

  const eventsList = events.slice(firstIndex, lastIndex);
  const npage = Math.ceil(events.length / prop.eventsPerPage);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedCamera) return;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/${selectedCamera}/events`
        );
        console.log(response.data.event, "asdf");
        setEvents(response.data.event);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    if (selectedCamera) {
      fetchEvents();
    }
  }, [selectedCamera]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEventDetailView = (event) => {
    navigate("/:eventId/eventdetail", { state: { event: event } });
  };
  // const handleEventDeletion = (event) => {
  //   console.log(`Event to delete:${event}`);
  // };

  return selectedCamera ? (
    events.length > 0 ? (
      <>
        {/* <ActionButtons
          setEventsPerPage={prop.setEventsPerPage}
          eventsPerPage={prop.eventsPerPage}
          handleDelete={handleEventDeletion}
        /> */}
        <EventTable
          events={eventsList}
          handleEventDetailView={handleEventDetailView}
        />
        <EventPagination
          npage={npage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </>
    ) : (
      <p>No events found for the selected camera.</p>
    )
  ) : (
    <p>Please select a camera to view its events.</p>
  );
}
