import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CrearMesero() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [direccion, setDireccion] = useState('')
  const [dni, setDni] = useState('')
  const [edad, setEdad] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const manejarCreacion = async ()=>{
    try{
      const urlCrear = "http://localhost:3000/api/mesero/crearMesero"
      let respuesta = await axios.post(urlCrear,{
        nombres: nombres,
        apellidos: apellidos,
        direccion: direccion,
        dni: dni,
        edad: edad,
        correo: correo,
        password: password,
      })
  
      if (respuesta.status === 200) {
        navigate("/mantMeseros");
      }
    }catch(error){
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
              <h3 className="panel-heading">Crear Mesero</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Nombres</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombres" placeholder="Ingrese nombres" onChange={(e)=>{setNombres(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Apellidos" className="col-sm-2 control-label">Apellidos</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Apellidos" placeholder="Ingrese apellidos" onChange={(e)=>{setApellidos(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Direccion" className="col-sm-2 control-label">Direccion</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Direccion" placeholder="Ingrese direccion" onChange={(e)=>{setDireccion(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Dni" className="col-sm-2 control-label">Dni</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="Dni" placeholder="Ingrese Dni" onChange={(e)=>{setDni(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Edad" className="col-sm-2 control-label">Edad</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="Edad" placeholder="Ingrese Edad" onChange={(e)=>{setEdad(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Correo" className="col-sm-2 control-label">Correo</label>
                  <div className="col-sm-10">
                    <input type="Correo" className="form-control" id="nombrePlatillo" placeholder="Ingrese Correo" onChange={(e)=>{setCorreo(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Contraseña</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="nombrePlatillo" placeholder="Ingrese contraseña" onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                  Agregar Mesero
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrearMesero