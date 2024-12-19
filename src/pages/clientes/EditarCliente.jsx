import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarCliente() {
    const [platillo, setPlatillo] = useState(null)
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState("")
    const [nro, setNro] = useState(0)
    const [dni, setDni] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const consulta = async (id) => {
        if (id) {
            const urlConsulta = `http://localhost:3000/api/cliente/consultaCliente/${id}`
            axios.get(urlConsulta)
                .then(respuesta => {
                    const datosCliente = respuesta.data
                    setPlatillo(datosCliente)
                    setNombre(datosCliente.nombre)
                    setEmail(datosCliente.email)
                    setNro(datosCliente.nro)
                    setDni(datosCliente.dni)
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error al consultar el cliente:", error)
                    setError(true)
                    setLoading(false)
                });
        } else {
            console.error("ID del cliente no encontrado");
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        consulta(id)
        console.log("ID recibido:", id);

    }, [id]);

    const manejarActualizacion = async () => {
        try {
            const urlActualizar = `http://localhost:3000/api/cliente/actualizarCliente/${id}`;
            const respuesta = await axios.put(urlActualizar, {
                nombre: nombre,
                email: email,
                nro: nro,
                dni: dni
            });

            if (respuesta.status === 200) {
                console.log("Cliente actualizado exitosamente");
                navigate("/mantClientes");
            }
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            alert("Ocurrió un error al guardar los cambios.");
        }
    };

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error al cargar el cliente. Intenta de nuevo.</div>;

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-filled">
                            <h3 className="panel-heading">Editar Cliente</h3>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="nombreCliente" className="control-label">Nombres del Cliente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombreCliente"
                                        placeholder="Ingrese nombre del cliente"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="control-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingrese Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="celular" className="control-label">Celular</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="celular"
                                        placeholder="Ingrese Celular"
                                        onChange={(e) => setNro(e.target.value)}
                                        value={nro}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dni" className="control-label">Dni</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="dni"
                                        placeholder="Ingrese Dni"
                                        onChange={(e) => setDni(e.target.value)}
                                        value={dni}
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

export default EditarCliente