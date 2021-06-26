import "./CreateDesigner.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
function EliminarDesigner(p) {

    const [nombresDesigners, setNombresDesigners] = useState([]);
    const [nombre, setNombre] = useState('');

    const setNombreSeleccionado = async (e) => {
        let n = e;
        setNombre(n.replace(/\s+/g,''));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!nombre) return;
        console.log(nombre);

        await axios.get(`http://localhost:8090/api/EliminarDesigner/${nombre}`);
        p.history.push('/designers');
    }

    useEffect(() => {
        (async () => {
            const listaNombres = await axios.get(`http://localhost:8090/api/GetDesigners`, {
            });
            setNombresDesigners(listaNombres.data);
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
        <div className="marco2">
            <div>
                <label>
                        <p>Diseñador a Eliminar</p>
                        <select onInputCapture = {e => setNombreSeleccionado(e.target.value)}>
                            <option >Seleccionar</option>
                            { 
                                nombresDesigners.map(name => (
                                    <option>{name.nombre+' '+name.apellido1+' '+name.apellido2}</option>
                                ))
                            }
                        </select>
                </label>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="submit" value="Eliminar"/>
                </div>
           </form>
      </div>
    </div>
      );
  }

  export default EliminarDesigner