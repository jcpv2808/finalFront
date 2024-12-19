import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function MantClientes() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const manejarEliminar = async (id) => {
    try {
      const urlEliminar = `http://localhost:3000/api/cliente/eliminarCliente/${id}`;
      await axios.delete(urlEliminar);
      cargarClientes();
    } catch (err) {
      setError(err);
    }
  };

  const cargarClientes = async () => {
    try {
      const urlListar = "http://localhost:3000/api/cliente/listarCliente";
      const response = await axios.get(urlListar);
      setData(response.data);
      setCargando(false);
    } catch (err) {
      setError(err);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarClientes();
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
                  <small>Mant Clientes <span className="c-white"></span></small>
                </div>
                <div className="header-icon">
                  <i className="pe page-header-icon pe-7s-menu"></i>
                </div>
                <div className="header-title">
                  <h3>Mantenimiento Clientes</h3>
                  <small>Listado de clientes.</small>
                </div>
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-filled">
                <Link className="btn btn-success" to="/crearCliente">Crear</Link>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Nombres</th>
                          <th>Email</th>
                          <th>Celular</th>
                          <th>Dni</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((cliente) => {
                          return (
                            <tr key={cliente._id}>
                              <td>{cliente.nombre}</td>
                              <td>{cliente.email}</td>
                              <td>{cliente.nro}</td>
                              <td>{cliente.dni}</td>
                              <td>
                                <Link className="btn btn-warning" to={`/editarCliente/${cliente._id}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={() => manejarEliminar(cliente._id)}>
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

export default MantClientes