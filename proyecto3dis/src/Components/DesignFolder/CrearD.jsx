import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CreateDesign.css";
import {
  Link
} from "react-router-dom";

function CrearD(p) {

  const [idTipoV, setIdTipoV] = useState([]);
  const [idD, setIdD] = useState();
  const [trasmision, setTrasmision] = useState([]);
  const [materialAsientos, setMaterialAsientos] = useState([]);
  const [motor, setMotor] = useState([]);
  const [vidriosElectricos, setVidriosElectricos] = useState([]);
  const [espejosElectricos, setEspejosElectricos] = useState([]);
  const [sensoresProxTraseros, setSensoresProxTraseros] = useState([]);
  const [sensoresProxDelanteros, setSensoresProxDelanteros] = useState([]);
  const [nombreDesign, setNombreDesign] = useState([]);
  const [nombreListaVehiculos, setNombreListaVehiculos] = useState([]);
  const [nombreListaDesigners, setNombreListaDesigners] = useState([]);

  useEffect(() => {
    (async () => {
        const listaVehiculos = await axios.get(`http://localhost:8090/api/GetTipoVehiculos`, {
        });
        setNombreListaVehiculos(listaVehiculos.data);
    })()
  },[])

  const setIdDesigner = async (e) => {
    const res = await axios.get(`http://localhost:8090/api/GetIDDesigner/${e}`);
    setIdD(res.data[0].id);
  }

  const mostrarDesigners = async (event) => {
    const res = await axios.get(`http://localhost:8090/api/GetIDTipoVehiculo/${event}`);
    const idVehiculo = res.data[0].id;
    setIdTipoV(idVehiculo);
    const res2 = await axios.get(`http://localhost:8090/api/GetNombreDesigner/${idVehiculo}`);
    setNombreListaDesigners(res2.data);
  }

  const setVidrioE = (e) => {
    console.log(e," Vidrio Electrico")
    if(e === "Sí"){
        setVidriosElectricos(1);
    }else{
        setVidriosElectricos(0);
    }
  }
  const setEspejosE = (e) => {
    if(e === "Sí"){
        setEspejosElectricos(1);
    }else{
        setEspejosElectricos(0);
    }
  }
  const setSensoresD = (e) => {
    if(e === "Sí"){
        setSensoresProxDelanteros(1);
    }else{
        setSensoresProxDelanteros(0);
    }
  }
  const setSensoresT = (e) => {
    if(e === "Sí"){
        setSensoresProxTraseros(1);
    }else{
        setSensoresProxTraseros(0);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*console.log(idTipoV,trasmision,materialAsientos,motor,vidriosElectricos,espejosElectricos,sensoresProxTraseros,sensoresProxDelanteros,nombreDesign,idD);
    if(!idTipoV||!trasmision||!materialAsientos||!motor||!vidriosElectricos||!espejosElectricos||!sensoresProxTraseros||!sensoresProxDelanteros||!nombreDesign||!idD){ 
      console.log("NOPE"); 
      return;
    }*/
    await axios.post(`http://localhost:8090/api/InsertarDesign`, { 
        idTipoV: idTipoV,
        trasmision: trasmision,
        material_asientos: materialAsientos,
        motor: motor,
        vidrios_electricos: vidriosElectricos,
        espejos_electricos: espejosElectricos,
        sensoresProx_traseros: sensoresProxTraseros,
        sensoresProx_delanteros: sensoresProxDelanteros,
        nombredesign: nombreDesign,
        idDesigner: idD
    });

    p.history.push('/designs');
}

  return (
    <div>
        <div className="marco">
            <Link to={`/CrearDesign`}>
                <button>Crear Diseño</button>
            </Link>
            <Link to={`/ModificarDiseño`}>
                <button>Modificar Diseño</button>
            </Link>
            <Link to={`/EliminarDiseño`}>
                <button>Eliminar Diseño</button>
            </Link>
        </div>
        <div className="marco2">
          <form onSubmit={handleSubmit}>
          <label>
                <p>Diseñador</p>
                <select onInputCapture = {e => setIdDesigner(e.target.value)}>
                    <option ></option>
                    { 
                        nombreListaDesigners.map(name => (
                            <option>{name.nombre}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                <p>Tipo Vehiculo</p>
                <select onInputCapture = {e => mostrarDesigners(e.target.value)}>
                    <option ></option>
                    { 
                        nombreListaVehiculos.map(name => (
                            <option>{name.nombreTipo}</option>
                        ))
                    }
                </select>
            </label>  
            <label>
                  <p>Nombre Diseño</p>
                  <input 
                      type="text"
                      onChange={e => setNombreDesign(e.target.value)}
                  />
              </label>
              <label >
                  <p>Trasmisón</p>
                  <select onInputCapture = {e => setTrasmision(e.target.value)}>
                    <option ></option>
                    <option >Sencilla</option>
                    <option >4x4</option>
                </select>
              </label>
              <label>
                  <p>Materal Asientos</p>
                  <select onInputCapture = {e => setMaterialAsientos(e.target.value)}>
                    <option ></option>
                    <option >Tela</option>
                    <option >Cuero</option>
                </select>
              </label>
              <label >
                  <p>Motor</p>
                  <select onInputCapture = {e => setMotor(e.target.value)}>
                    <option ></option>
                    <option >Gasolina</option>
                    <option >Disel</option>
                    <option >Gas Licuado</option>
                    <option >Eléctrico</option>
                    <option >Híbrido</option>
                </select>
              </label>
              <label>
                  <p>Vídrios Eléctricos</p>
                  <select onInputCapture = {e => setVidrioE(e.target.value)}>
                    <option ></option> 
                    <option >Sí</option>
                    <option >No</option>
                </select>
              </label>
              <label >
                  <p>Espejos Eléctricos</p>
                  <select onInputCapture = {e => setEspejosE(e.target.value)}>
                    <option ></option> 
                    <option >Sí</option>
                    <option >No</option>
                </select>
              </label>
              <label >
                  <p>Sensores Proximidad Delanteros</p>
                  <select onInputCapture = {e => setSensoresD(e.target.value)}>
                    <option ></option> 
                    <option >Sí</option>
                    <option >No</option>
                </select>
              </label>
              <label >
                <p>Sensores Proximidad Traseros</p>
                  <select onInputCapture = {e => setSensoresT(e.target.value)}>
                    <option ></option> 
                    <option >Sí</option>
                    <option >No</option>
                </select>
              </label>
              <div><input type="submit" value="Agregar" /></div>    
          </form>
      </div>
    </div>
  );
  }
  
  export default CrearD;