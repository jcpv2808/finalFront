import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//vendor styles
import '../../assets/vendor/fontawesome/css/font-awesome.css';
import '../../assets/vendor/animate.css/animate.css';
import '../../assets/vendor/bootstrap/css/bootstrap.css';

//app styles
import '../../assets/styles/pe-icons/pe-icon-7-stroke.css';
import '../../assets/styles/pe-icons/helper.css';
import '../../assets/styles/stroke-icons/style.css';
import '../../assets/styles/style.css';

//scripts
import '../../assets/vendor/pacejs/pace.min.js';
import '../../assets/vendor/jquery/dist/jquery.min.js';
import '../../assets/vendor/bootstrap/js/bootstrap.min.js';

//luna scripts
import '../../assets/scripts/luna.js';

function MantPlatillos() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const manejarEliminar = async (id) => {
    try {
      const urlEliminar = `http://localhost:3000/api/platillo/eliminarPlatillo/${id}`;
      await axios.delete(urlEliminar);
      cargarPlatillos();
    } catch (err) {
      setError(err);
    }
  };

  const cargarPlatillos = async () => {
    try {
      const urlListar = "http://localhost:3000/api/platillo/listarPlatillo";
      const response = await axios.get(urlListar);
      setData(response.data);
      setCargando(false);
    } catch (err) {
      setError(err);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPlatillos();
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
                  <small>Mant Platillos <span className="c-white"></span></small>
                </div>
                <div className="header-icon">
                  <i className="pe page-header-icon pe-7s-menu"></i>
                </div>
                <div className="header-title">
                  <h3>Mantenimiento Platillos</h3>
                  <small>Listado de platillos.</small>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-filled">
                <Link className="btn btn-success" to="/crearPlatillo">Crear</Link>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Ingredientes</th>
                          <th>Precio</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((platillo) => {
                          return (
                            <tr key={platillo._id}>
                              <td>{platillo.nombre}</td>
                              <td>
                                {platillo.ingredientes.map((ingrediente, index) => (
                                  <span key={index}>
                                    {ingrediente}{index < platillo.ingredientes.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </td>
                              <td>{platillo.precio}</td>
                              <td>
                                <Link className="btn btn-warning" to={`/editarPlatillo/${platillo._id}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={() => manejarEliminar(platillo._id)}>
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

export default MantPlatillos;
