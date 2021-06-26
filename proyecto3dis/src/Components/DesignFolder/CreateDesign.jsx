import "./CreateDesign.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";

function CreateDesign() {
    const [diseños, setDiseños] = useState([]);
    const [nombreD, setNombreD] = useState("");

    const changeType = (e) => {
        if(e === true)
            return "Sí";
        else
            return "No";
    }
    
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
            const res = await axios.get(`http://localhost:8090/api/GetVDesigns`, {
            });
            setDiseños(res.data);
                if(res.data[0] !== undefined){
                const id = res.data[0].idTipoV;

                const res2 = await axios.get(`http://localhost:8090/api/GetNombreDesigner/${id}`);
                setNombreD(res2.data[0].nombre);
            }
        })()
    },[])

    return (
    <div className="Corporativo">
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
        <div className="Tabla">
          <div className="div-c">
              <div className="div-nuevo2">
                  <table id="customers">
                      <thead>
                        <tr>
                            <th>Nombre Diseño</th>
                            <th>Nombre Diseñador</th>
                            <th>Tipo Vehiculo</th>
                            <th>Trasmision</th>
                            <th>Material Asientos</th>
                            <th>Motor</th>
                            <th>Vidrios Electricos</th>
                            <th>Espejos Electricos</th>
                            <th>Sensores de Proximidad Traseros</th>
                            <th>Sensores de Proximidad Delanteros</th>
                        </tr>
                      </thead>
                  { 
                      diseños.map(diseños => (
                          <tbody>
                              <tr>
                                  <td>{diseños.nombredesign}</td>
                                  <td>{nombreD}</td>
                                  <td>{getNombreV(diseños.idTipoV)}</td>
                                  <td>{diseños.trasmision}</td>
                                  <td>{diseños.material_asientos}</td>
                                  <td>{diseños.motor}</td>
                                  <td>{changeType(diseños.vidrios_electricos)}</td>
                                  <td>{changeType(diseños.espejos_electricos)}</td>
                                  <td>{changeType(diseños.sensoresProx_traseros)}</td>
                                  <td>{changeType(diseños.sensoresProx_delanteros)}</td>
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
  
  export default CreateDesign;