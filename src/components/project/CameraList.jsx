import { Card, Col, Row } from "antd";

export default function CameraList(prop) {
  const { cameras } = prop;

  return (
    <>
      {cameras.length > 0 ? (
        <Row gutter={[16, 16]}>
          {cameras.map((camera) => (
            <>
              <p>{console.log(`asdfg${cameras}`)}</p>
              <Col key={camera.id} xs={24} sm={12} md={8}>
                <Card
                  title={camera.name}
                  bordered={true}
                  className="camera-card"
                >
                  <ul className="list-unstyled">
                    <li>
                      <strong>Camera ID:</strong> {camera.id}
                    </li>
                    <li>
                      <strong>Camera ID:</strong> {camera.name}
                    </li>
                    <li>
                      <strong>Resolution:</strong> {camera.resolution}
                    </li>
                  </ul>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ) : (
        <p>No cameras found for this project.</p>
      )}
    </>
  );
}
