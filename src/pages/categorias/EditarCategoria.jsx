import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function EditarCategoria() {
    const [categoria, setCategoria] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(true);  // Para mostrar el mensaje de carga
    const [error, setError] = useState(false);     // Para mostrar el mensaje de error
    const navigate = useNavigate();
    const { id } = useParams();

    const consulta = async (id) => {
        if (id) {
            const urlConsulta = `http://localhost:3000/api/categoria/consultarCategoria/${id}`;
            axios.get(urlConsulta)
                .then(respuesta => {
                    const datosCategoria = respuesta.data
                    console.log(datosCategoria)
                    setCategoria(datosCategoria)
                    setNombre(datosCategoria.nombre)
                    setDescripcion(datosCategoria.descripcion)
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error al consultar el categoria:", error)
                    setError(true)
                    setLoading(false)
                });
        } else {
            console.error("ID del categoria no encontrado");
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
            const urlActualizar = `http://localhost:3000/api/categoria/actualizarCategoria/${id}`;
            const respuesta = await axios.put(urlActualizar, {
                nombre,
                descripcion: descripcion,
            });

            if (respuesta) {
                console.log("Categoria actualizado exitosamente");
                navigate("/mantCategorias");
            }
        } catch (error) {
            console.error("Error al actualizar el categoria:", error);
            alert("Ocurrió un error al guardar los cambios.");
        }
    };

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error al cargar la categoria. Intenta de nuevo.</div>;

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-filled">
                            <h3 className="panel-heading">Editar Categoria</h3>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="nombreCategoria" className="control-label">Nombre de la Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombreCategoria"
                                        placeholder="Nombre de la categoria"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion" className="control-label">Descripcion</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descripcion"
                                        placeholder="Descripcion"
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        value={ descripcion}
                                    />
                                </div>

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

export default EditarCategoria