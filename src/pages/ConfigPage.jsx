import { useState } from "react";
import { FormControl, Slider, Typography, Button } from "@mui/material";
import { Container, Form } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";
import { API_BASE_URL } from "../Utils/api";

export default function ConfigPage() {
  const [configEventsPerPage, setcConfigEventsPerPage] = useState(10); // Saved value
  const [sliderValue, setSliderValue] = useState(10); // Slider selection value

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // Update only the slider's temporary value
  };

  const configApi = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/${id}/change_project_config`,
        {
          project_id: id,
          eventsPerPage: configEventsPerPage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Project Config changed successfully");
    } catch (error) {
      console.error("Error on config api:", error);
    }
  };

  const handleSaveChanges = () => {
    setcConfigEventsPerPage(sliderValue); // Update the saved value when "Save Changes" is clicked
    configApi();
    console.log("Saved events per page:", sliderValue);
  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <h3 style={{ color: "#1976d2" }}>Configuration Page</h3>
        <Form>
          <Typography variant="h5">
            Choose the number of events to display on Table.
          </Typography>
          <Form.Group>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Typography variant="subtitle1" gutterBottom>
                Events per page:
              </Typography>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="rows-per-page-slider"
                step={10}
                marks
                min={10}
                max={50}
                valueLabelDisplay="auto"
              />
            </FormControl>
          </Form.Group>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Form>
      </Container>
    </>
  );
}
