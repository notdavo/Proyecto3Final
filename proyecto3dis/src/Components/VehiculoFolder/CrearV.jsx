import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CrearVehiculo.css";
import {
  Link
} from "react-router-dom";

function CrearV(p) {

  const [nombreListaVehiculos, setNombreListaVehiculos] = useState([]);
  const [nombresPlantas, setNombresPlantas] = useState([]);
  const [nombresDesigns, setNombresDesigns] = useState([]);
  const [nombresOwners, setNombresOwners] = useState([]);
  const [idP, setIdP] = useState('');
  const [idDesing, setIdDesing] = useState([]);
  const [idVehiculo, setIdV] = useState([]);
  const [idOwner, setCedOwner] = useState([]);
  const [placa, setPlaca] = useState([]);

  useEffect(() => {
    (async () => {
        const listaVehiculos = await axios.get(`http://localhost:8090/api/GetTipoVehiculos`);
        setNombreListaVehiculos(listaVehiculos.data);
        const listaNombres = await axios.get(`http://localhost:8090/api/GetNombresPlanta`);
        setNombresPlantas(listaNombres.data);
        const listaOwners = await axios.get(`http://localhost:8090/api/GetOwnerName`);
        setNombresOwners(listaOwners.data);
    })()
  },[])

  const setIdVehiculo = async (e) => {
    const res = await axios.get(`http://localhost:8090/api/GetIDTipoVehiculos/${e}`);
    const idV = res.data[0].id;
    setIdV(idV);
    const listaDesigns = await axios.get(`http://localhost:8090/api/GetDesigns/${idV}`);
    setNombresDesigns(listaDesigns.data);
  }

  const setIdDesign = async (e) => {
    const res = await axios.get(`http://localhost:8090/api/GetIDDesign/${e}`);
    setIdDesing(res.data[0].id);
  }

  const setIdOwner = async (e) => {
    const res = await axios.get(`http://localhost:8090/api/GetCedOwner/${e}`);
    setCedOwner(res.data[0].cedula);
  }

  const setIdPlanta = async (event) => {
    const res = await axios.get(`http://localhost:8090/api/GetIDPlanta/${event}`);
    const idP = res.data[0].id;
    setIdP(idP);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*console.log(idTipoV,trasmision,materialAsientos,motor,vidriosElectricos,espejosElectricos,sensoresProxTraseros,sensoresProxDelanteros,nombreDesign,idD);
    if(!idTipoV||!trasmision||!materialAsientos||!motor||!vidriosElectricos||!espejosElectricos||!sensoresProxTraseros||!sensoresProxDelanteros||!nombreDesign||!idD){ 
      console.log("NOPE"); 
      return;
    }*/

    const res2 = await axios.get(`http://localhost:8090/api/GetBloquePlantaVehiculo/${idP}/${idVehiculo}`);
    const idB = res2.data[0].id;

    await axios.post(`http://localhost:8090/api/CrearVehiculo`, { 
        placa: placa,
        idTipoVehiculo: idVehiculo,
        idBloque: idB,
        cedulaOwner: idOwner,
        idDesign: idDesing
    });

    await axios.post(`http://localhost:8090/api/EditaBloque`);

    p.history.push('/vehiculos');
}

  return (
    <div>
        <div className="marco">
            <Link to={`/CrearVehiculo`}>
                <button>Crear Vehiculo</button>
            </Link>
        </div>
        <div className="marco2">
          <form onSubmit={handleSubmit}>
          <label>
                <p>Planta</p>
                <select onInputCapture = {e => setIdPlanta(e.target.value)}>
                    <option ></option>
                    { 
                        nombresPlantas.map(name => (
                            <option>{name.nombre}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                <p>Tipo Vehiculo</p>
                <select onInputCapture = {e => setIdVehiculo(e.target.value)}>
                    <option ></option>
                    { 
                        nombreListaVehiculos.map(name => (
                            <option>{name.nombreTipo}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                <p>Diseños</p>
                <select onChange = {e => setIdDesign(e.target.value)}>
                    <option ></option>
                    { 
                        nombresDesigns.map(name => (
                            <option>{name.nombreDesign}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                <p>Dueño</p>
                <select onInputCapture = {e => setIdOwner(e.target.value)}>
                    <option ></option>
                    { 
                        nombresOwners.map(name => (
                            <option>{name.nombre}</option>
                        ))
                    }
                </select>
            </label>
            <label>
                  <p>Placa</p>
                  <input 
                      type="text"
                      onChange={e => setPlaca(e.target.value)}
                  />
              </label>
              <div><input type="submit" value="Agregar" /></div>    
          </form>
      </div>
    </div>
  );
  }
  
  export default CrearV;