// RegistroUsuario.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledBuscarCliente, StyledRegistroUsuario } from './styled';

const RegistroUsuario = () => {
    const SERVER_URL = 'http://localhost:5001';
    const CLIENTES_ENDPOINT = '/clientes';
    const EMPLEADOS_ENDPOINT = '/empleados';
    const CORTES_ENDPOINT = '/cortes';

    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombres: '',
        apellidos: '',
        contrasena: '',
        peluquero_asignado: null,
        id_corte: null,
    });

    const [empleados, setEmpleados] = useState([]);

    const fetchEmpleados = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}${EMPLEADOS_ENDPOINT}`);
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    const [cortes, setCortes] = useState([]);

    const fetchCortes = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}${CORTES_ENDPOINT}`);
            setCortes(response.data);
        } catch (error) {
            console.error('Error al obtener los cortes:', error);
        }
    };

    useEffect(() => {
        fetchEmpleados();
        fetchCortes();

        const intervalId = setInterval(() => {
            fetchEmpleados();
            fetchCortes();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const registrarUsuario = async () => {
        try {
            if (!nuevoUsuario.id_corte || !nuevoUsuario.peluquero_asignado) {
                alert('Debes seleccionar un corte y un peluquero antes de registrar el usuario.');
                return;
            }

            await axios.post(`${SERVER_URL}${CLIENTES_ENDPOINT}`, nuevoUsuario);

            alert(`Usuario registrado exitosamente.`);

            setNuevoUsuario({
                nombres: '',
                apellidos: '',
                contrasena: '',
                peluquero_asignado: null,
                id_corte: null,
            });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };


    return (
        <StyledRegistroUsuario>
            <h2>Registro de Usuario</h2>
            <form>
                <label htmlFor="nombres">Nombres:</label>
                <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    placeholder='Ingrese sus nombres'
                    value={nuevoUsuario.nombres}
                    onChange={handleInputChange}
                />

                <label htmlFor="apellidos">Apellidos:</label>
                <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    placeholder='Ingrese sus apellidos'
                    value={nuevoUsuario.apellidos}
                    onChange={handleInputChange}
                />

                <label htmlFor="contrasena">Contraseña:</label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    placeholder="Ingrese su contraseña"
                    value={nuevoUsuario.contrasena}
                    onChange={handleInputChange}
                />

                <StyledBuscarCliente>
                <label htmlFor="peluquero_asignado">Peluquero Asignado:</label>
                <br/><select
                    id="peluquero_asignado"
                    name="peluquero_asignado"
                    value={nuevoUsuario.peluquero_asignado || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un peluquero</option>
                    {empleados.map((empleado) => (
                        <option key={empleado.id} value={empleado.id}>
                            {empleado.Nombre}
                        </option>
                    ))}
                </select>

                </StyledBuscarCliente>
                    <StyledBuscarCliente>
                <label htmlFor="id_corte">Corte:</label>
                <br /><select
                    id="id_corte"
                    name="id_corte"
                    value={nuevoUsuario.id_corte || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccione un corte</option>
                    {cortes.map((corte) => (
                        <option key={corte.id} value={corte.id}>
                            {corte.nombre_corte}
                        </option>
                    ))}
                </select>
                    </StyledBuscarCliente>
                <button type="button" onClick={registrarUsuario}>
                    Registrar Usuario
                </button>
            </form>
        </StyledRegistroUsuario>
    );

};

export default RegistroUsuario;