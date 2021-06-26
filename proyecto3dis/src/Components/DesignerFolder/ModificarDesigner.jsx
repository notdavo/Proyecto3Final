import "./CreateDesigner.css";
import axios from 'axios';
import React, { useEffect, useState,} from 'react';
import {
    Link
  } from "react-router-dom";
    
  function ModificarDesigner(p) {

    const [nombres, setNombresDesigners] = useState([])
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [experiencia, setExperiencia] = useState(0);
    const [nivel, setNivel] = useState('');
    const [vehiculo, setVehiculo] = useState(0)
    const [nombreSeleccionado, setNombreSeleccionado] = useState('');

 
    useEffect(() => {
        (async () => {
            const listaNombres = await axios.get(`http://localhost:8090/api/GetDesigners`, {
            });
            setNombresDesigners(listaNombres.data);
        })()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nombre || !apellido1 || !apellido2 || !experiencia || !nivel || vehiculo===0 || nombreSeleccionado==='Seleccionar') return;

        await axios.post(`http://localhost:8090/api/ModificarDesigner`, { 
            idTipoVehiculo: vehiculo,
            nombre: nombreSeleccionado,
            nombreMod: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            yearsExp: experiencia,
            nivel: nivel
        });
        p.history.push('/designers');
    }

    const setVehiculoSeleccionado = async (e) => {
        const n = e;
        if (n !== 'Seleccionar') {
            setVehiculo(n)
            const res = await axios.get(`http://localhost:8090/api/GetIDTipoVehiculos/${n}`)
            console.log(res.data);
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
        <div>
            <label>
                <p>Diseñador a Modificar</p>
                <select onInputCapture = {e => setNombreSeleccionado(e.target.value)}>
                    <option >Seleccionar</option>
                    { 
                        nombres.map(name => (
                            <option>{name.nombre + ' ' + name.apellido1 + ' ' + name.apellido2}</option>
                        ))
                    }
                </select>
            </label>
        </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <label >
                            <p>Nombre</p>
                            <input 
                                type="text"
                                //value={info.provincia}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Primer apellido</p>
                            <input 
                                type="text"
                                //value={info.canton}
                                onChange={e => setApellido1(e.target.value)}
                            />
                        </label>
                        <label >
                            <p>Segundo apellido</p>
                            <input 
                                type="text"
                                //value={info.distrito}
                                onChange={e => setApellido2(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Experiencia</p>
                            <input 
                                type="number"
                                //value={info.direccion_exacta}
                                onChange={e => setExperiencia(e.target.value)}
                            />
                        </label>
                        <label >
                            <p>Nivel</p>
                            <input 
                                type="text"
                                //value={info.telefono}
                                onChange={e => setNivel(e.target.value)}
                            />
                        </label>
                            <p>Vehiculo</p>
                        <select onInputCapture={e => setVehiculoSeleccionado(e.target.value)} >
                            <option>Seleccionar</option>
                            <option>Sedán</option>
                            <option>Camioneta</option>
                            <option>Sedán de Lujo</option>
                        </select>
                    </div>
                    <input type="submit" value="Modificar"/>
           </form>
      </div>
    </div>
      );
  }

  export default ModificarDesigner