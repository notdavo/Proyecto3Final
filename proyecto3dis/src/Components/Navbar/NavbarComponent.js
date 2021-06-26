import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useLocation } from 'react-router-dom';

function NavbarComponent() {
  const [plantas, setPlantas] = useState("outline-light");
  const [designs, setDesigns] = useState("outline-light");
  const [designers, setDesigners] = useState("outline-light");
  const [vehiculos, setVehiculos] = useState("outline-light");
  const location = useLocation()

  React.useEffect(() => {
    onClick(location.pathname);
  }, [location]);

  const onClick = (button) => {
    setPlantas("outline-light");
    setDesigns("outline-light");
    setDesigners("outline-light");

    if (button.includes("/plantas") || button === "/plantas") setPlantas("primary");
    if (button === "/designs") setDesigns("primary");
    if (button === "/designers") setDesigners("primary");
    if (button === "/vehiculos") setVehiculos("primary");
  };

  return (
    <Navbar bg="dark" variant="dark" activeKey="/">
      <div className="ml-auto">
        <Link to="/plantas">
          <Button variant={plantas} onClick={() => onClick("/plantas")}>
            Planta
          </Button>{" "}
        </Link>
        <Link to="/designs">
          <Button variant={designs} onClick={() => onClick("/designs")}>
            Diseños
          </Button>{" "}
        </Link>
        <Link to="/designers">
          <Button variant={designers} onClick={() => onClick("/designers")}>
            Diseñadores
          </Button>{" "}
        </Link>
        <Link to="/vehiculos">
          <Button variant={vehiculos} onClick={() => onClick("/vehiculos")}>
            Vehículos
          </Button>{" "}
        </Link>
      </div>
    </Navbar>
  );
}

export default NavbarComponent;
