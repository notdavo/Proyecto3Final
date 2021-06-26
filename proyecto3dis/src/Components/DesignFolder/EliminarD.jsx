import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CreateDesign.css";
import {
  Link
} from "react-router-dom";

function EliminarD() {

  const [idDesing, setIdDesing] = useState();
  const [listaDesignNames, setListaDesignNames] = useState([]);

  useEffect(() => {
    (async () => {
        const listaDNames = await axios.get(`http://localhost:8090/api/GetDesignsName`, {
        });
        console.log(listaDNames.data)
        setListaDesignNames(listaDNames.data);
    })()
  },[])

  const setIdDesign = async (e) => {
    console.log(e," Nombre D")
    const res = await axios.get(`http://localhost:8090/api/GetIDDesign/${e}`);
    console.log(res.data[0].id)
    setIdDesing(res.data[0].id);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(idDesing)
    await axios.get(`http://localhost:8090/api/EliminarDesign/${idDesing}`);
}

  return (
    <div>
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
        <div className="marco2">
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Nombre Diseño</p>
                        <select onInputCapture = {e => setIdDesign(e.target.value)}>
                            <option ></option>
                            { 
                                listaDesignNames.map(nameD => (
                                    <option>{nameD.nombreDesign}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div><input type="submit" value="Eliminar" /></div>    
                </form>
            </div>
        </div>
    </div>
  );
  }
  
  export default EliminarD;