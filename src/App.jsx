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

// function App() {
//   console.log("App component rendered");

//   return <h1>Hello, World!</h1>;
// }

// export default App;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/projects" element={<ProjectDisplay />} />
          <Route path="/viewproject" element={<ViewProjectDetails />} />
          {/* <Route path="/projects/:projectId" element={<Event />} /> */}
          <Route path="/projects/:projectId/event" element={<EventPage />} />
          <Route path="/addproject" element={<ProjectForm />} />
          <Route path="/editproject" element={<ProjectEditForm />} />
          <Route path="/addcamera" element={<AddCameraForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
