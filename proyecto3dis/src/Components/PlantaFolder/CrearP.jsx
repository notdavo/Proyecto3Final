import axios from 'axios';
import React, { useState } from 'react';
import "./CreatePlanta.css";
import {
  Link
} from "react-router-dom";

function CrearP(p) {

  const [nombre, setNombre] = useState('');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [distrito, setDistrito] = useState('');
  const [direccionExacta, setDireccionExacta] = useState('');
  const [telefono, setTelefono] = useState('');

 
    const handleSubmit = async (event) => {
        console.log(event);
        event.preventDefault();
        if(!nombre || !provincia || !canton || !distrito || !direccionExacta || !telefono) return;
        
        await axios.post(`http://localhost:8090/api/CrearPlanta`, { 
            nombre: nombre,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion_exacta: direccionExacta,
            telefono: telefono
        });

        const res3 = await axios.get(`http://localhost:8090/api/GetIDPlanta/${nombre}`);

        for(let i = 1; i < 4; i++){
            axios.post(`http://localhost:8090/api/CrearBloque`, { 
                idTipoVehiculo: i,
                idPlanta: res3.data[0].id,
                espacioDisponible: 10
            });
        }

        p.history.push('/plantas');
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
          <form onSubmit={handleSubmit}>
              <label>
                  <p>Nombre</p>
                  <input 
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                  />
              </label>
              <label >
                  <p>Provincia</p>
                  <input 
                      type="text"
                      value={provincia}
                      onChange={e => setProvincia(e.target.value)}
                  />
              </label>
              <label>
                  <p>Cantón</p>
                  <input 
                      type="text"
                      value={canton}
                      onChange={e => setCanton(e.target.value)}
                  />
              </label>
              <label >
                  <p>Distrito</p>
                  <input 
                      type="text"
                      value={distrito}
                      onChange={e => setDistrito(e.target.value)}
                  />
              </label>
              <label>
                  <p>Dirección Exacta</p>
                  <input 
                      type="text"
                      value={direccionExacta}
                      onChange={e => setDireccionExacta(e.target.value)}
                  />
              </label>
              <label >
                  <p>Teléfono</p>
                  <input 
                      type="text"
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                  />
              </label>
              <div><input type="submit" value="Agregar" /></div>           
          </form>
      </div>
    </div>
  );
  }
  
  export default CrearP;