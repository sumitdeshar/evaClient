import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectForm from "./components/project/ProjectForm";
import ProjectDisplay from "./pages/ProjectPage";
import ProjectEditForm from "./components/project/ProjectEditForm";
import AddCameraForm from "./components/project/AddCamera";
import ViewProjectDetails from "./components/project/ViewProject";
import EventPage from "./pages/EventPage";
import EventDetails from "./pages/EventDetails";
import ConfigPage from "./pages/ConfigPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element={<ProjectDisplay />} />
          <Route path="/config" element={<ConfigPage />} />
          {/* project routes */}
          <Route path="/viewproject" element={<ViewProjectDetails />} />
          <Route path="/addproject" element={<ProjectForm />} />
          <Route path="/editproject" element={<ProjectEditForm />} />
          <Route path="/addcamera" element={<AddCameraForm />} />
          {/* event routes */}
          <Route path="/projects/:projectId/event" element={<EventPage />} />
          <Route path="/:eventId/eventdetail" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// function App() {
//   console.log("App component rendered");

//   return <h1>Hello, World!</h1>;
// }

// export default App;
