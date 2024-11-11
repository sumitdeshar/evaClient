// import {
//   Button,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
import { Button } from "@mui/material";
import { Row, Col } from "react-bootstrap";

export default function ActionButtons(prop) {
  // const handleChange = (event) => {
  //   prop.setEventsPerPage(event.target.value);
  // };

  return (
    <Row>
      {/* <Col>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
          <Select
            labelId="rows-per-page-label"
            id="rows-per-page-select"
            value={prop.eventsPerPage}
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Col> */}
      <Col xs={12} sm={2} className="text-start">
        <Button
          variant="contained"
          color="error"
          style="align to left"
          onClick={prop.handleDelete}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
}
