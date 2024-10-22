import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export default function EventPhoto() {
  return (
    <Container>
      <Col xs={6} md={4}>
        <Image src="https://picsum.photos/1000/720" fluid />
      </Col>
    </Container>
  );
}
