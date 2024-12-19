import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditarMesero() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [direccion, setDireccion] = useState('')
  const [dni, setDni] = useState('')
  const [edad, setEdad] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const consulta = async(id)=>{
    if (id) {
      const token = localStorage.getItem('token');
      const urlConsulta = `http://localhost:3000/api/mesero/consultarMesero/${id}`;
      axios.get(urlConsulta, {
        headers: {
          'x-access-token': token
        }
      })
        .then(respuesta => {
          const datosMesero = respuesta.data
          setNombres(datosMesero.nombres)
          setApellidos(datosMesero.apellidos)
          setDireccion(datosMesero.direccion)
          setDni(datosMesero.dni)
          setEdad(datosMesero.edad)
          setCorreo(datosMesero.correo)
          setPassword(datosMesero.password)
          setLoading(false)
        })
        .catch(error => {
          console.error("Error al consultar el mesero:", error)
          setError(true)
          setLoading(false)
        });
    } else {
      console.error("ID del mesero no encontrado");
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    consulta(id)
    console.log("ID recibido:", id);
    
  }, [id]);

  const manejarActualizacion = async () => {
    try {
      const token = localStorage.getItem('token');
      const urlActualizar = `http://localhost:3000/api/mesero/actualizarMesero/${id}`;
      const respuesta = await axios.put(urlActualizar, {
        nombres: nombres,
        apellidos: apellidos,
        direccion: direccion,
        dni: dni,
        edad: edad,
        correo: correo,
        password: password,
      },
      {
        headers: {
          'x-access-token': token,
        }
      });

      if (respuesta.status === 201) {
        console.log("Mesero actualizado exitosamente");
        navigate("/mantMeseros");
      }
    } catch (error) {
      console.error("Error al actualizar el mesero:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar el mesero. Intenta de nuevo.</div>;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Editar Mesero</h3>
              <div className="panel-body">
              <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Nombres</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombres" placeholder="Ingrese nombres" onChange={(e)=>{setNombres(e.target.value)}} value={nombres}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Apellidos" className="col-sm-2 control-label">Apellidos</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Apellidos" placeholder="Ingrese apellidos" onChange={(e)=>{setApellidos(e.target.value)}} value={apellidos}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Direccion" className="col-sm-2 control-label">Direccion</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Direccion" placeholder="Ingrese direccion" onChange={(e)=>{setDireccion(e.target.value)}} value={direccion}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Dni" className="col-sm-2 control-label">Dni</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="Dni" placeholder="Ingrese Dni" onChange={(e)=>{setDni(e.target.value)}} value={dni}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Edad" className="col-sm-2 control-label">Edad</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="Edad" placeholder="Ingrese Edad" onChange={(e)=>{setEdad(e.target.value)}} value={edad}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Correo" className="col-sm-2 control-label">Correo</label>
                  <div className="col-sm-10">
                    <input type="Correo" className="form-control" id="nombrePlatillo" placeholder="Ingrese Correo" onChange={(e)=>{setCorreo(e.target.value)}} value={correo}/>
                  </div>
                </div>
                <br />
                <br />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={manejarActualizacion}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditarMesero