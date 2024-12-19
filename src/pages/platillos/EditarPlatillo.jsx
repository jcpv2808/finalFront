import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarPlatillo() {
  const [platillo, setPlatillo] = useState(null);
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState('');
  const [precio, setPrecio] = useState(0);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);  // Para mostrar el mensaje de carga
  const [error, setError] = useState(false);     // Para mostrar el mensaje de error
  const navigate = useNavigate();
  const { id } = useParams();

  const consulta = async(id)=>{
    if (id) {
      const urlConsulta = `http://localhost:3000/api/platillo/consultaPlatillo/${id}`;
      axios.get(urlConsulta)
        .then(respuesta => {
          const datosPlatillo = respuesta.data
          setPlatillo(datosPlatillo)
          setNombre(datosPlatillo.nombre)
          setPrecio(datosPlatillo.precio)
          setListaIngredientes(datosPlatillo.ingredientes || [])
          setLoading(false)
        })
        .catch(error => {
          console.error("Error al consultar el platillo:", error)
          setError(true)
          setLoading(false)
        });
    } else {
      console.error("ID del platillo no encontrado");
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    consulta(id)
    console.log("ID recibido:", id);
    
  }, [id]);

  const manejarListaIngredientes = () => {
    if (ingrediente.trim() && !listaIngredientes.includes(ingrediente)) {
      setListaIngredientes([...listaIngredientes, ingrediente]);
      setIngrediente('');
    }
  };

  const manejarActualizacion = async () => {
    try {
      const urlActualizar = `http://localhost:3000/api/platillo/actualizarPlatillo/${id}`;
      const respuesta = await axios.put(urlActualizar, {
        nombre,
        ingredientes: listaIngredientes,
        precio,
        imagen: "default.jpg"
      });

      if (respuesta.status === 201) {
        console.log("Platillo actualizado exitosamente");
        navigate("/mantPlatillos");
      }
    } catch (error) {
      console.error("Error al actualizar el platillo:", error);
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
              <h3 className="panel-heading">Editar Platillo</h3>
              <div className="panel-body">
                {/* Campo para el nombre del platillo */}
                <div className="form-group">
                  <label htmlFor="nombrePlatillo" className="control-label">Nombre del Platillo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombrePlatillo"
                    placeholder="Nombre del platillo"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                  />
                </div>

                {/* Campo para el precio del platillo */}
                <div className="form-group">
                  <label htmlFor="precio" className="control-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    placeholder="Precio"
                    onChange={(e) => setPrecio(Number(e.target.value))}
                    value={precio}
                  />
                </div>

                {/* Campo para agregar ingredientes */}
                <div className="form-group">
                  <label htmlFor="ingredientes" className="control-label">Ingredientes</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredientes"
                    placeholder="Ingrese ingrediente"
                    value={ingrediente}
                    onChange={(e) => setIngrediente(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={manejarListaIngredientes}
                >
                  Agregar Ingrediente
                </button>

                {/* Mostrar lista de ingredientes */}
                {listaIngredientes.length > 0 && (
                  <div className="mt-3">
                    <h4>Ingredientes:</h4>
                    <ul>
                      {listaIngredientes.map((ing, index) => (
                        <li key={index}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botón para guardar cambios */}
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

export default EditarPlatillo;
