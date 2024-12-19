import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function MantOrdenes() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const manejarEliminar = async (id) => {
    try {
      const urlEliminar = `http://localhost:3000/api/orden/eliminarOrden/${id}`
      await axios.delete(urlEliminar)
      cargarOrdenes()
    } catch (err) {
      setError(err)
    }
  };

  const cargarOrdenes = async () => {
    try {
      const urlListar = "http://localhost:3000/api/orden/listarOrden";
      const response = await axios.get(urlListar);
      setData(response.data);
      setCargando(false);
    } catch (err) {
      setError(err);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarTabla = () => {
    if (cargando) {
      return <div>Cargando...</div>;
    }
    if (error) {
      return <div>Error al cargar los datos: {error.message}</div>;
    }
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="view-header">
                <div className="pull-right text-right" style={{ lineHeight: "14px" }}>
                  <small>Mant Ordenes <span className="c-white"></span></small>
                </div>
                <div className="header-icon">
                  <i className="pe page-header-icon pe-7s-menu"></i>
                </div>
                <div className="header-title">
                  <h3>Mantenimiento Ordenes</h3>
                  <small>Listado de ordenes.</small>
                </div>
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-filled">
                <Link className="btn btn-success" to="/crearOrden">Crear</Link>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Platillos</th>
                          <th>Nro Mesa</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((orden) => {
                          return (
                            <tr key={orden._id}>
                              <td>
                                {orden.platillos.map((platillo, index) => (
                                  <span key={index}>
                                    {platillo.nombre} - {platillo.cantidad}{index < orden.platillos.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </td>
                              <td>{orden.idMesa}</td>
                              <td>{orden.estado}</td>
                              <td>
                                <Link className="btn btn-warning" to={`/editarOrden/${orden.idMesa}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={() => manejarEliminar(orden._id)}>
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="wrapper">
      {cargarTabla()}
    </div>
  );
}

export default MantOrdenes