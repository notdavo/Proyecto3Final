import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CreatePlanta.css";
import {
  Link
} from "react-router-dom";

function EliminarP() {

  const [nombresPlantas, setNombresPlantas] = useState([]);
  const [id, setID] = useState();
  const [nombre, setNombre] = useState('');
 
    useEffect(() => {
        (async () => {
            const listaNombres = await axios.get(`http://localhost:8090/api/GetNombresPlanta`, {
            });
            setNombresPlantas(listaNombres.data);
        })()
    },[])

    const setNombreSeleccionado = async (e) => {
        console.log("adfasdfasdfasdf")
        const n = e;
        setNombre(n);
        const res3 = await axios.get(`http://localhost:8090/api/GetIDPlanta/${n}`);
        const i = res3.data[0].id;
        setID(i);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!nombre) return;    

        const res = await axios.get(`http://localhost:8090/api/GetIDBloque/${id}`);
        if(res.data[0] !== undefined){
            const idBloque = res.data[0].id;
            await axios.get(`http://localhost:8090/api/EliminarVehiculo/${idBloque}`);
        }
        await axios.get(`http://localhost:8090/api/EliminarBloque/${id}`);
        await axios.get(`http://localhost:8090/api/EliminarPlanta/${id}`);
    }

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
    
        <div className="marco2">
            <div>
                <label>
                        <p>Planta a Eliminar</p>
                        <select onInputCapture = {e => setNombreSeleccionado(e.target.value)}>
                            <option ></option>
                            { 
                                nombresPlantas.map(name => (
                                    <option>{name.nombre}</option>
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
  
  export default EliminarP;