import "./CreateDesigner.css";
import axios from 'axios';
import React, { useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
  function AddDesigner(p) {

    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setapellido2] = useState('');
    const [experiencia, setExperiencia] = useState(0);
    const [nivel, setNivel] = useState('');
    const [vehiculo, setVehiculo] = useState(0)


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nombre || !apellido1 || !apellido2 || !experiencia || !nivel || vehiculo===0) return;

        await axios.post(`http://localhost:8090/api/CrearDesigner`, {
            idTipoVehiculo: vehiculo,
            nombre: nombre,
            apellido1: apellido1,
            apellido2:apellido2,
            yearsExp: experiencia,
            nivel: nivel
        })
        
        p.history.push('/designers');
    }

    const setVehiculoSeleccionado = async (e) => {
        const n = e;
        if (n !== 'Seleccionar') {
            setVehiculo(n)
            const res = await axios.get(`http://localhost:8090/api/GetIDTipoVehiculos/${n}`)
            console.log(res.data[0].id);
            setVehiculo(res.data[0].id)
        } else {
            setVehiculo(0)
        }
    }


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
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Nombre</p>
                    <input 
                        type="text"
                        //value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </label>
                <label >
                    <p>Primer apellido</p>
                    <input 
                        type="text"
                        //value={provincia}
                        onChange={e => setApellido1(e.target.value)}
                    />
                </label>
                <label>
                    <p>Segundo apellido</p>
                    <input 
                        type="text"
                        //value={canton}
                        onChange={e => setapellido2(e.target.value)}
                    />
                </label>
                <label >
                    <p>Años de experiencia</p>
                    <input 
                        type="number"
                        //value={distrito}
                        onChange={e => setExperiencia(e.target.value)}
                    />
                </label>
                <label>
                    <p>Nivel de diseñador</p>
                    <input 
                        type="text"
                        //value={direccionExacta}
                        onChange={e => setNivel(e.target.value)}
                    />
                </label>
                <label >
                    <p>Vehiculo asociado</p>
                    <select onInputCapture={e => setVehiculoSeleccionado(e.target.value)}>
                    <option>Seleccionar</option>
                    <option>Sedan</option>
                    <option>Camioneta</option>
                    <option>Sedan de Lujo</option>
                </select>
                </label>
                <div><input type="submit" value="Agregar" /></div>
            </form>
        </div>
    </div>
    );
}

  export default AddDesigner