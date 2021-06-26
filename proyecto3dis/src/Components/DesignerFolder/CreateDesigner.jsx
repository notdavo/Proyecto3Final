import "./CreateDesigner.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
  function CreateDesigner() {

    const [designs, setDesigns] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:8090/api/GetDesigners`, {
            });
            setDesigns(res.data);
        })()
    },[])

    return (
    <div className="Corporativo">
        <div className="marco" >
            <Link to={`/CrearDesigner`}>
                <button>Crear Diseñador</button>
            </Link>
            <Link to={`/ModificarDesigner`}>
                <button>Modificar Diseñador</button>
            </Link>
            <Link to={`EliminarDesigner`}>
                <button>Eliminar Diseñador</button>
            </Link>
        </div>
        <div className="Tabla">
          <div className="div-c">
              <div className="div-nuevo2">
                  <table id="customers">
                      <thead>
                        <tr>
                            <th>Nombre Diseñador</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Años de Experiencia</th>
                            <th>Nivel de Diseñador</th>
                            <th>Tipo de Vehiculo</th>
                        </tr>
                      </thead>
                  { 
                      designs.map(design => (
                          <tbody>
                              <tr>
                                  <td>{design.nombre}</td>
                                  <td>{design.apellido1}</td>
                                  <td>{design.apellido2}</td>
                                  <td>{design.yearsExp}</td>
                                  <td>{design.nivel}</td>
                                  <td>{design.nombreTipo}</td>
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
  
  export default CreateDesigner;