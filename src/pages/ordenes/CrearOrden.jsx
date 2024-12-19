import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CrearOrden() {
  const [idMesaOrden, setIdMesaOrden] = useState(0);
  const [listaPlatillos, setListaPlatillos] = useState([]);
  const [platillo, setPlatillo] = useState('');
  const [cantidad, setCantidad] = useState(0)
  const navigate = useNavigate();

  const manejarListaPlatillos = () => {
    if (platillo && cantidad) {
      setListaPlatillos([...listaPlatillos, {nombre: platillo, cantidad: cantidad}])
      setPlatillo('') 
      setCantidad(0) 
    }
  }

  const manejarCreacion = async () => {
    try {
      const urlCrear = `http://localhost:3000/api/orden/crearOrden`;
      const respuesta = await axios.post(urlCrear, {
        platillos: listaPlatillos,
        idMesa: idMesaOrden,
        estado: "pendiente",
      });

      if (respuesta.status === 201) {
        console.log("orden creada exitosamente");
        navigate("/mantOrdenes");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Crear Orden</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="nroMesa" className="control-label">Nro de Mesa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nroMesa"
                    placeholder="Ingrese nro de mesa"
                    onChange={(e) => setIdMesaOrden(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Platillo" className="control-label">Platillo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Platillo"
                    placeholder="Ingrese platillo"
                    onChange={(e) => setPlatillo(e.target.value)}
                    value={platillo}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Cantidad" className="control-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Cantidad"
                    placeholder="Ingrese cantidad"
                    onChange={(e) => setCantidad(e.target.value)}
                    value={cantidad}
                  />
                </div>

                <button type="button" className="btn btn-primary" onClick={manejarListaPlatillos}>
                  Agregar Platillo
                </button>

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
                  onClick={(e)=>manejarCreacion()}
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

export default CrearOrden