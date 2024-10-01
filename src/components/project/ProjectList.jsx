import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";

export default function ProjectList(prop) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Replace with actual fetch call and remove the timeout
  }, [prop.project]);

  const handleViewDetails = (event, proj) => {
    event.stopPropagation();
    navigate("/viewproject", { state: { project: proj } });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      {prop.project.map((proj) => (
        <Col key={proj.id} md={4} className="mb-4">
          <Card
            className="h-100 project-card"
            onClick={() =>
              navigate(`/projects/${proj.id}/event`, {
                state: { project: proj },
              })
            }
            style={{ borderColor: "var(--bs-primary)" }}
          >
            <Card.Body>
              <Card.Title>{proj.name}</Card.Title>
              <Card.Text>{proj.location}</Card.Text>
              <Button
                variant="primary"
                onClick={(event) => handleViewDetails(event, proj)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
