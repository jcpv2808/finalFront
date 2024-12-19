import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
function MantCategorias() {
  const [data, setData] = useState([]);  // Cambié el valor inicial a un array vacío
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función para eliminar un platillo
  const manejarEliminar = async (id) => {
    try {
      const urlEliminar = `http://localhost:3000/api/categoria/eliminarCategoria/${id}`;
      await axios.delete(urlEliminar);  // Esperamos que se elimine el platillo
      cargarCategorias();  // Vuelve a cargar los platillos después de eliminar uno
    } catch (err) {
      setError(err);
    }
  };

  // Función para cargar los platillos
  const cargarCategorias = async () => {
    try {
      const urlListar = "http://localhost:3000/api/categoria/listarCategoria";

      const response = await axios.get(urlListar);
      setData(response.data);
      setCargando(false);
    } catch (err) {
      setError(err);
      setCargando(false);
    }
  };

  // Usamos useEffect para cargar los platillos cuando el componente se monta
  useEffect(() => {
    cargarCategorias();
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
                  <small>Mant Categorias <span className="c-white"></span></small>
                </div>
                <div className="header-icon">
                  <i className="pe page-header-icon pe-7s-menu"></i>
                </div>
                <div className="header-title">
                  <h3>Mantenimiento Categorias</h3>
                  <small>Listado de categorias.</small>
                </div>
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-filled">
                <Link className="btn btn-success" to="/crearCategoria">Crear</Link>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((categoria) => {
                          return (
                            <tr key={categoria._id}>
                              <td>{categoria.nombre}</td>
                              <td>{categoria.descripcion}</td>
                              <td>
                                <Link className="btn btn-warning" to={`/editarCategoria/${categoria._id}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={() => manejarEliminar(categoria._id)}>
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

export default MantCategorias