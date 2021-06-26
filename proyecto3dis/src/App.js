import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavbarComponent from "./Components/Navbar/NavbarComponent";
import MainPage from "./Components/MainPage/MainPage";
import CreatePlanta from "./Components/PlantaFolder/CreatePlanta";
import CrearP from "./Components/PlantaFolder/CrearP";
import EliminarP from "./Components/PlantaFolder/EliminarP";
import ModificarP from "./Components/PlantaFolder/ModificarP";
import CrearD from "./Components/DesignFolder/CrearD";
import ModificarD from "./Components/DesignFolder/ModificarD";
import EliminarD from "./Components/DesignFolder/EliminarD";
import CreateDesign from "./Components/DesignFolder/CreateDesign";
import CreateDesigner from "./Components/DesignerFolder/CreateDesigner";
import CrearVehiculo from "./Components/VehiculoFolder/CrearVehiculo";
import CrearV from "./Components/VehiculoFolder/CrearV";
import AddDesigner from './Components/DesignerFolder/AddDesigner'
import EliminarDesigner from './Components/DesignerFolder/EliminarDesigner'
import ModificarDesigner from './Components/DesignerFolder/ModificarDesigner'

function App() {
  return (
    <Router>
      <NavbarComponent></NavbarComponent>
      <Switch>
        <Route path="/" exact component={MainPage}></Route>
        <Route path="/plantas" exact component={CreatePlanta}></Route>
        <Route path="/designs" exact component={CreateDesign}></Route>
        <Route path="/designers" exact component={CreateDesigner}></Route>
        <Route path="/vehiculos" exact component={CrearVehiculo}></Route>
        <Route path="/CrearPlanta" exact component={CrearP}></Route>
        <Route path="/ModificarPlanta" exact component={ModificarP}></Route>
        <Route path="/CrearDesign" exact component={CrearD}></Route>
        <Route path="/ModificarDiseño" exact component={ModificarD}></Route>
        <Route path="/EliminarDiseño" exact component={EliminarD}></Route>
        <Route path="/EliminarPlanta" exact component={EliminarP}></Route>
        <Route path="/CrearVehiculo" exact component={CrearV}></Route>
        <Route path="/CrearDesigner" exact component={AddDesigner}></Route>
        <Route path="/EliminarDesigner" exact component={EliminarDesigner}></Route>
        <Route path="/ModificarDesigner" exact component={ModificarDesigner}></Route>
      </Switch>
    </Router>
  );
}

export default App;