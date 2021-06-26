import "./CreatePlanta.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
  function CreatePlanta() {

    const [plantas, setPlantas] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8090/api/GetPlantas`);
            setPlantas(res.data);
        })()
    },[])

    return (
    <div className="Corporativo">
        <div className="marco">
            <Link to={`/CrearPlanta`}>
                <button>Crear Planta</button>
            </Link>
            <Link to={`/ModificarPlanta`}>
                <button>Modificar Planta</button>
            </Link>
            <Link to={`/EliminarPlanta`}>
                <button>Eliminar Planta</button>
            </Link>
        </div>
        <div className="Tabla">
          <div className="div-c">
              <div className="div-nuevo2">
                  <table id="customers">
                      <thead>
                        <tr>
                            <th>Planta</th>
                            <th>Nombre</th>
                            <th>Provincia</th>
                            <th>Canton</th>
                            <th>Distrito</th>
                            <th>Direccion exacta</th>
                            <th>Telefono</th>
                            <th>Cantidad BloqueA</th>
                            <th>Cantidad BloqueB</th>
                            <th>Cantidad BloqueC</th>
                        </tr>
                      </thead>
                  { 
                      plantas.map(planta => (
                          <tbody>
                              <tr>
                                  <td>{planta.id}</td>
                                  <td>{planta.nombre}</td>
                                  <td>{planta.provincia}</td>
                                  <td>{planta.canton}</td>
                                  <td>{planta.distrito}</td>
                                  <td>{planta.direccion_exacta}</td>
                                  <td>{planta.telefono}</td>
                                  <td>{planta.bloqueA}</td>
                                  <td>{planta.bloqueB}</td>
                                  <td>{planta.bloqueC}</td>
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
  
  export default CreatePlanta;