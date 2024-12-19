import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function CrearCuenta() {
  const [correcto, setCorrecto] = useState(false)
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [direccion, setDireccion] = useState("")
  const [dni, setDni] = useState("")
  const [edad, setEdad] = useState("")
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")

  const manejarCreacion = async () => {
    //nombres, apellidos, direccion, dni, edad, correo, password
    try {
      const urlCrear = "http://localhost:3000/api/mesero/crearMesero"
      const respuesta = await axios.post(urlCrear, {
        nombres: nombres,
        apellidos: apellidos,
        direccion: direccion,
        dni: dni,
        edad: edad,
        correo: correo,
        password: contraseña
      })

      if (respuesta.status == 200) {

        alert("Creacion correcta")
      } else {
        alert("Fallo la creacion")
      }

    } catch (error) {
      console.log("Error:" + error)
      alert("ERROR")
    }
  }
  return (
    //nombres, apellidos, direccion, dni, edad, correo, password
    <div class="wrapper">

      {/* <!-- Main content--> */}
      <section class="content" id='contentCorrecion'>

        <div class="container-center lg animated slideInDown">


          <div class="view-header">
            <div class="header-icon">
              <i class="pe page-header-icon pe-7s-add-user"></i>
            </div>
            <div class="header-title">
              <h3>Crear Cuenta</h3>
              <small>
                Porfavor ingresa la informacion necesaria.
              </small>
            </div>
          </div>

          <div class="panel panel-filled">
            <div class="panel-body">
              <p>

              </p>
              <div class="row">
                <div class="form-group col-lg-12">
                  <label>Correo</label>
                  <input type="" id="username" class="form-control" name=""
                    onChange={(e) => setCorreo(e.target.value)} />
                  <span class="help-block small">Ingrese su correo electronico</span>
                </div>
                <div class="form-group col-lg-12">
                  <label>Contraseña</label>
                  <input type="password"  id="password" class="form-control" name=""
                    onChange={(e) => setContraseña(e.target.value)} />
                  <span class="help-block small">Ingrese una contraseña</span>
                </div>
                <div class="form-group col-lg-6">
                  <label>Nombres</label>
                  <input type="text"  id="email" class="form-control" name=""
                    onChange={(e) => setNombres(e.target.value)} />
                  <span class="help-block small">Ingrese sus nombres</span>
                </div>
                <div class="form-group col-lg-6">
                  <label>Apellidos</label>
                  <input type="text"  id="email" class="form-control" name=""
                    onChange={(e) => setApellidos(e.target.value)} />
                  <span class="help-block small">Ingrese sus apellidos</span>
                </div>
                <div class="form-group col-lg-6">
                  <label>Edad</label>
                  <input type="number"  id="email" class="form-control" name=""
                    onChange={(e) => setEdad(e.target.value)} />
                  <span class="help-block small">Ingrese su edad</span>
                </div>
                <div class="form-group col-lg-6">
                  <label>Dni</label>
                  <input type="number"  id="email" class="form-control" name=""
                    onChange={(e) => setDni(e.target.value)} />
                  <span class="help-block small">Ingrese su número de Dni</span>
                </div>
                <div class="form-group col-lg-12">
                  <label>Direccion</label>
                  <input type="text" id="email" class="form-control" name=""
                    onChange={(e) => setDireccion(e.target.value)} />
                  <span class="help-block small">Ingrese su direccion </span>
                </div>
              </div>
              <div>
                <Link class="btn btn-accent" onClick={manejarCreacion} to="/login">Registrar</Link>
                <Link class="btn btn-default" to="/login">Regresar al Login</Link>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* <!-- End main content--> */}
    </div>
  )
}

export default CrearCuenta