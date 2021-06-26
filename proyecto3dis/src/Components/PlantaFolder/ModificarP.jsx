import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CreatePlanta.css";
import {
  Link
} from "react-router-dom";

function ModificarP() {

  const [nombresPlantas, setNombresPlantas] = useState([]);
  const [id, setID] = useState();
  const [nombre, setNombre] = useState('');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [distrito, setDistrito] = useState('');
  const [direccionExacta, setDireccionExacta] = useState('');
  const [telefono, setTelefono] = useState('');
  const [infoPlanta, setInfoPlanta] = useState([]);

 
    useEffect(() => {
        (async () => {
            const listaNombres = await axios.get(`http://localhost:8090/api/GetNombresPlanta`, {
            });
            setNombresPlantas(listaNombres.data);
        })()
    },[])

    const setNombreSeleccionado = async (e) => {
        const n = e;
        setNombre(n);
        const res3 = await axios.get(`http://localhost:8090/api/GetIDPlanta/${n}`);
        const i = res3.data[0].id;
        setID(i);
        const res4 = await axios.get(`http://localhost:8090/api/GetPlanta/${i}`);
        setInfoPlanta(res4.data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!nombre || !provincia || !canton || !distrito || !direccionExacta || !telefono) return;    

        await axios.post(`http://localhost:8090/api/ModificarPlanta`, { 
            id: id,
            nombre: nombre,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion_exacta: direccionExacta,
            telefono: telefono
        });
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
                <p>Planta a Modificar</p>
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
                { 
                    infoPlanta.map(info => (
                        <div>
                            <label >
                                <p>Provincia</p>
                                <input 
                                    type="text"
                                    //value={info.provincia}
                                    onChange={e => setProvincia(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>Cantón</p>
                                <input 
                                    type="text"
                                    //value={info.canton}
                                    onChange={e => setCanton(e.target.value)}
                                />
                            </label>
                            <label >
                                <p>Distrito</p>
                                <input 
                                    type="text"
                                    //value={info.distrito}
                                    onChange={e => setDistrito(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>Dirección Exacta</p>
                                <input 
                                    type="text"
                                    //value={info.direccion_exacta}
                                    onChange={e => setDireccionExacta(e.target.value)}
                                />
                            </label>
                            <label >
                                <p>Teléfono</p>
                                <input 
                                    type="text"
                                    //value={info.telefono}
                                    onChange={e => setTelefono(e.target.value)}
                                />
                            </label>
                        </div>
                    ))                
                }
                <div>
                    <input type="submit" value="Modificar"/>
                </div>
           </form>
      </div>
    </div>
  );
  }
  
  export default ModificarP;