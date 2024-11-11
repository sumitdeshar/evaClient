import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spin } from "antd";

export default function ProjectList(prop) {
  const { project } = prop;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [project]);

  const handleViewDetails = (event, proj) => {
    event.stopPropagation();
    navigate("/viewproject", {
      state: { project: proj },
    });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row justify="center" gutter={[16, 16]}>
      {Array.isArray(project) && project.length > 0 ? (
        project.map((proj) => (
          <Col key={proj.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={proj.name}
              bordered
              hoverable
              onClick={() => navigate(`/projects/${proj.id}/event`)}
              style={{ borderColor: "var(--primary-blue)" }}
            >
              <p>{proj.location}</p>
              <Button
                type="primary"
                onClick={(event) => handleViewDetails(event, proj)}
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))
      ) : (
        <div>No project available.</div>
      )}
    </Row>
  );
}
