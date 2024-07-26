// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const SERVER_URL = 'http://localhost:5001';
    const LOGIN_ENDPOINT = '/login';

    const [credenciales, setCredenciales] = useState({
        usuario: '',
        contrasena: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredenciales((prevCredenciales) => ({
            ...prevCredenciales,
            [name]: value,
        }));
    };

    const iniciarSesion = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}${LOGIN_ENDPOINT}`, credenciales);

            if (response.data.success) {
                onLogin();
            } else {
                alert('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesion</h2>
            <form>
                <label htmlFor="usuario">Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={credenciales.usuario}
                    onChange={handleInputChange}
                />

                <label htmlFor="contrasena">Contrasenia:</label>
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={credenciales.contrasena}
                    onChange={handleInputChange}
                />

                <button type="button" onClick={iniciarSesion}>
                    Iniciar Sesion
                </button>
            </form>
        </div>
    );
};

export default Login;
