import "./CrearVehiculo.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
  function CrearVehiculo() {

    const [vehiculos, setVehiculos] = useState([]);
    const [nombreD,   setNombreD] = useState([]);
    
    const getNombreV = (e) => {
        if(e === 1)
            return "Sedán"
        else if(e === 2)
            return "Sedán de Lujo"
        else
            return "Camioneta"
    }

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8090/api/GetVehiculos`, {
            });
            const idTV = res.data[0].idTipoVehiculo;
            setVehiculos(res.data);
            const res2 = await axios.get(`http://localhost:8090/api/GetDesigns/${idTV}`);
            console.log(res2.data[0]);
            setNombreD(res2.data[0].nombreDesign);
        })()
    },[])

    return (
    <div className="Corporativo">
        <div className="marco">
            <Link to={`/CrearVehiculo`}>
                <button>Crear Vehiculo</button>
            </Link>
        </div>
        <div className="Tabla">
          <div className="div-c">
              <div className="div-nuevo2">
                  <table id="customers">
                      <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Tipo Vehiculo</th>
                            <th>ID Bloque</th>
                            <th>Cédula</th>
                            <th>Diseño</th>
                        </tr>
                      </thead>
                  { 
                      vehiculos.map(vehiculo => (
                          <tbody>
                              <tr>
                                  <td>{vehiculo.placa}</td>
                                  <td>{getNombreV(vehiculo.idTipoVehiculo)}</td>
                                  <td>{vehiculo.idBloque}</td>
                                  <td>{vehiculo.cedulaOwner}</td>
                                  <td>{nombreD}</td>
                              </tr>     
                          </tbody>
                      ))
                  }
                  </table>
              </div>
          </div>
        </div>
    </div>
    );
  }
  
  export default CrearVehiculo;