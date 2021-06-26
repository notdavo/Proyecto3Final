import React from "react";
import "./MainPage.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function MainPage() {
  return (
    <div className="main-div">
      <Container>
        <Row className="justify-content-md-center ">
          <Col lg={100}>
            <h3>Sistema de Ensamblaje de Vehículos</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;