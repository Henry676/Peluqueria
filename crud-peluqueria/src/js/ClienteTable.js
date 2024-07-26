import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledBuscarCliente, StyledListaClientes } from './styled';

const ClienteTable = () => {
    const SERVER_URL = 'http://localhost:5001';
    const CLIENTES_ENDPOINT = '/clientes';

    const [clientes, setClientes] = useState([]);
    const [clienteEditando, setClienteEditando] = useState(null);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombres: '',
        apellidos: '',
        peluquero_asignado: '',
        id_corte: '',
    });

    const [filtro, setFiltro] = useState('');
    const [columnaBusqueda, setColumnaBusqueda] = useState('nombres');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value,
        }));
    };

    const handleGuardarCambios = async (id) => {
        try {
            await axios.put(`${SERVER_URL}${CLIENTES_ENDPOINT}/${id}`, nuevoCliente);
            fetchData();
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
        }

        setClienteEditando(null);
        setNuevoCliente({
            nombres: '',
            apellidos: '',
            peluquero_asignado: '',
            id_corte: '',
        });
    };

    const handleCancelarEdicion = () => {
        setClienteEditando(null);
        setNuevoCliente({
            nombres: '',
            apellidos: '',
            peluquero_asignado: '',
            id_corte: '',
        });
    };

    const editarCliente = (id) => {
        const clienteSeleccionado = clientes.find((cliente) => cliente.id === id);
        setClienteEditando(clienteSeleccionado.id);
        setNuevoCliente({ ...clienteSeleccionado });
    };

    const eliminarCliente = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}${CLIENTES_ENDPOINT}/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    const filtrarClientes = () => {
        return clientes.filter((cliente) => {
            const valor = cliente[columnaBusqueda];
            return valor && typeof valor === 'string' && valor.toLowerCase().includes(filtro.toLowerCase());
        });
    };

    const agregarCliente = async () => {
        try {
            await axios.post(`${SERVER_URL}${CLIENTES_ENDPOINT}`, nuevoCliente);
            fetchData();
            setNuevoCliente({
                nombres: '',
                apellidos: '',
                peluquero_asignado: '',
                id_corte: '',
            });
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
        }
    };

    const handleSelectChange = (e) => {
        setColumnaBusqueda(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}${CLIENTES_ENDPOINT}`);
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const [empleados, setEmpleados] = useState([]);
    const [cortes, setCortes] = useState([]);

    const fetchEmpleados = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/empleados`);
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const fetchCortes = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/cortes`);
            setCortes(response.data);
        } catch (error) {
            console.error('Error al obtener los cortes:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseClientes = await axios.get(`${SERVER_URL}${CLIENTES_ENDPOINT}`);
                setClientes(responseClientes.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
        fetchEmpleados();
        fetchCortes();

        const intervalId = setInterval(() => {
            fetchData();
            fetchEmpleados();
            fetchCortes();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const obtenerNombreEmpleado = (id) => {
        const empleado = empleados.find((empleado) => empleado.id === id);
        return empleado ? empleado.Nombre : '';
    };

    const obtenerNombreCorte = (id) => {
        const corte = cortes.find((corte) => corte.id === id);
        return corte ? corte.nombre_corte : '';
    };


    return (
        <>
            <StyledBuscarCliente>
                <h2>Buscar Cliente</h2>
                <select value={columnaBusqueda} onChange={handleSelectChange}>
                    <option value="nombres">Nombres</option>
                    <option value="apellidos">Apellidos</option>
                    <option value="peluquero_asignado">Peluquero Asignado</option>
                    <option value="id_corte">Corte</option>
                </select>
                <input
                    type="text"
                    placeholder={`Buscar por ${columnaBusqueda}`}
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </StyledBuscarCliente>

            <StyledListaClientes>
                <h2>Lista de Clientes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Peluquero Asignado</th>
                            <th>Corte</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarClientes().map((cliente) => (
                            <tr key={cliente.id}>
                                <td>
                                    {clienteEditando === cliente.id ? (
                                        <input type="text" name="nombres" value={nuevoCliente.nombres} onChange={handleInputChange} />
                                    ) : (
                                        cliente.nombres
                                    )}
                                </td>
                                <td>
                                    {clienteEditando === cliente.id ? (
                                        <input type="text" name="apellidos" value={nuevoCliente.apellidos} onChange={handleInputChange} />
                                    ) : (
                                        cliente.apellidos
                                    )}
                                </td>
                                <td>
                                    {clienteEditando === cliente.id ? (
                                        <input type="text" name="peluquero_asignado" value={nuevoCliente.peluquero_asignado} onChange={handleInputChange} />
                                    ) : (
                                        obtenerNombreEmpleado(cliente.peluquero_asignado)
                                    )}
                                </td>
                                <td>
                                    {clienteEditando === cliente.id ? (
                                        <input type="text" name="id_corte" value={nuevoCliente.id_corte} onChange={handleInputChange} />
                                    ) : (
                                        obtenerNombreCorte(cliente.id_corte)
                                    )}
                                </td>
                                <td>
                                    {clienteEditando === cliente.id ? (
                                        <>
                                            <button className="btn-guardar" onClick={() => handleGuardarCambios(cliente.id)}>
                                                Guardar
                                            </button>
                                            <button className="btn-cancelar" onClick={handleCancelarEdicion}>
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn-editar" onClick={() => editarCliente(cliente.id)}>
                                                Editar
                                            </button>
                                            <button className="btn-eliminar" onClick={() => eliminarCliente(cliente.id)}>
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td>
                                <input type="text" name="nombres" value={nuevoCliente.nombres} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="text" name="apellidos" value={nuevoCliente.apellidos} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="text" name="peluquero_asignado" value={nuevoCliente.peluquero_asignado} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="text" name="id_corte" value={nuevoCliente.id_corte} onChange={handleInputChange} />
                            </td>
                            <td>
                                <button className="btn-agregar" onClick={agregarCliente}>
                                    Agregar Cliente
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </StyledListaClientes>
        </>
    );
};

export default ClienteTable;
