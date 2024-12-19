import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CrearPlatillo() {
  const [listaIngredientes, setListaIngredientes] = useState([])
  const [ingrediente, setIngrediente] = useState('')
  const [precio, setPrecio] = useState(0)
  const [nombre, setNombre] = useState('')
  const navigate = useNavigate();

  const manejarListaIngredientes = () => {
    if (ingrediente) {
      setListaIngredientes([...listaIngredientes, ingrediente])
      setIngrediente('') 
    }
  }

  const manejarCreacion = async ()=>{
    try{
      const urlCrear = "http://localhost:3000/api/platillo/crearPlatillo"
      let respuesta = await axios.post(urlCrear,{
        nombre: nombre,
        ingredientes: listaIngredientes,
        precio: precio,
        imagen: "default.jpg"
      })
  
      //elimina datos
      setIngrediente('') 
      setListaIngredientes([])

      if (respuesta.status === 200) {
        navigate("/mantPlatillos");
      }
    }catch{
      console.log("Error:", error);
      alert("Datos incorrectos");
    }
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Crear Platillo</h3>
              <div className="panel-body">
                {/* Campo para el nombre del platillo */}
                <div className="form-group">
                  <label htmlFor="nombrePlatillo" className="col-sm-2 control-label">Nombre del Platillo</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="nombrePlatillo" placeholder="Nombre del platillo" onChange={(e)=>{setNombre(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                {/* Campo para el precio del platillo */}
                <div className="form-group">
                  <label htmlFor="precio" className="col-sm-2 control-label">Precio</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="precio" placeholder="Precio" onChange={(e)=>{setPrecio(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                {/* Campo para ingresar ingredientes */}
                <div className="form-group">
                  <label htmlFor="ingredientes" className="col-sm-2 control-label">Ingredientes</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="ingredientes"
                      placeholder="Ingrese ingrediente"
                      value={ingrediente}
                      onChange={(e) => setIngrediente(e.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={manejarListaIngredientes}>
                  Agregar Ingrediente
                </button>

                {/* Mostrar lista de ingredientes */}
                <br />
                <br />
                {listaIngredientes.length > 0 && (
                  <div>
                    <h4>Ingredientes:</h4>
                    {listaIngredientes.map((ingrediente, index) => (
                      <p key={index}>{ingrediente}</p>
                    ))}
                  </div>
                )}
                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                  Agregar Platillo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrearPlatillo
