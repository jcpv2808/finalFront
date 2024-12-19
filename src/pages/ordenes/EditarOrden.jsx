import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarOrden() {
  const [orden, setOrden] = useState(null);
  const [idMesaOrden, setIdMesaOrden] = useState(0);
  const [estado, setEstado] = useState("");
  const [listaPlatillos, setListaPlatillos] = useState([]);
  const [platillo, setPlatillo] = useState('');
  const [cantidad, setCantidad] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { idMesa } = useParams();

  const consulta = async (id) => {
    if (id) {
      const urlConsulta = `http://localhost:3000/api/orden/consultaOrdenPorMesa/${id}`;
      axios.get(urlConsulta)
        .then(respuesta => {
          const datosOrden = respuesta.data
          setOrden(datosOrden)
          setIdMesaOrden(datosOrden.idMesa)
          setEstado(datosOrden.estado)
          setListaPlatillos(datosOrden.platillos || [])
          setLoading(false)
        })
        .catch(error => {
          console.error("Error al consultar la orden:", error)
          setError(true)
          setLoading(false)
        });
    } else {
      console.error("ID de la orden no encontrado");
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    consulta(idMesa)
  }, []);

  const manejarActualizacion = async (id) => {
    try {
      const urlActualizar = `http://localhost:3000/api/orden/actualizarOrden/${id}`;
      const respuesta = await axios.put(urlActualizar, {
        estado: estado,
      });

      if (respuesta.status === 201) {
        console.log("orden actualizado exitosamente");
        navigate("/mantOrdenes");
      }
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar el platillo. Intenta de nuevo.</div>;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Editar Orden</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="nroMesa" className="control-label">Nro de Mesa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nroMesa"
                    placeholder="Ingrese nro de mesa"
                    onChange={(e) => setIdMesaOrden(e.target.value)}
                    value={idMesaOrden}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Estado" className="control-label">Estado</label>
                  <select
                    className="form-control"
                    id="Estado"
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                  >
                    <option>pendiente</option>
                    <option>entregado</option>
                    <option>cancelado</option>
                  </select>
                </div>
                {listaPlatillos.length > 0 && (
                  <div className="mt-3">
                    <h4>Orden:</h4>
                    <ul>
                      {listaPlatillos.map((platillo, index) => (
                        <li key={index}>{platillo.nombre} - {platillo.cantidad}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botón para guardar cambios */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e)=>manejarActualizacion(orden._id)}
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

export default EditarOrden