const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 5001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'peluqueria',
    port: '3306'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Función para manejar errores
function handleErrors(err, res) {
    console.error('Error en la consulta a la base de datos:', err);
    res.status(500).send('Error interno del servidor');
}

// Función para realizar operaciones de SELECT
function handleSelectQuery(res, query) {
    try {
        db.query(query, (err, result) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        handleErrors(error, res);
    }
}

// Función para realizar operaciones de INSERT
function handleInsertQuery(res, query, data) {
    try {
        db.query(query, data, (err, result) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.status(201).json({ message: 'Operación completada correctamente' });
            }
        });
    } catch (error) {
        handleErrors(error, res);
    }
}

// Función para realizar operaciones de UPDATE y DELETE
function handleUpdateDeleteQuery(res, query, params) {
    try {
        db.query(query, params, (err, result) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.status(200).send('Operación completada correctamente');
            }
        });
    } catch (error) {
        handleErrors(error, res);
    }
}


/////////////////////////////////////////////////////////////////////////////////
//////////////////////           EMPLEADOS             //////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// Obtener todos los empleados
app.get('/empleados', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM empleados');
});

// Crear un nuevo empleado
app.post('/empleados', (req, res) => {
    const nuevoEmpleado = req.body;
    handleInsertQuery(res, 'INSERT INTO empleados SET ?', nuevoEmpleado);
});

// Actualizar un empleado
app.put('/empleados/:id', (req, res) => {
    const id = req.params.id;
    const nuevoEmpleado = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE empleados SET ? WHERE id = ?', [nuevoEmpleado, id]);
});

// Eliminar un empleado
app.delete('/empleados/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM empleados WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////           CORTES             /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/cortes', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM cortes');
});

app.post('/cortes', (req, res) => {
    const nuevoCorte = req.body;
    handleInsertQuery(res, 'INSERT INTO cortes SET ?', nuevoCorte);
});

app.put('/cortes/:id', (req, res) => {
    const id = req.params.id;
    const nuevoCorte = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE cortes SET ? WHERE id = ?', [nuevoCorte, id]);
});

app.delete('/cortes/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM cortes WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////           CLIENTES             ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/clientes', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM clientes');
});

app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    handleInsertQuery(res, 'INSERT INTO clientes SET ?', nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const nuevoCliente = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE clientes SET ? WHERE id = ?', [nuevoCliente, id]);
});

app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM clientes WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////         HISTORIALES            ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/historiales', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM historiales');
});

app.post('/historiales', (req, res) => {
    const nuevoHistorial = req.body;
    handleInsertQuery(res, 'INSERT INTO historiales SET ?', nuevoHistorial);
});

app.put('/historiales/:id', (req, res) => {
    const id = req.params.id;
    const nuevoHistorial = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE historiales SET ? WHERE id = ?', [nuevoHistorial, id]);
});

app.delete('/historiales/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM historiales WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////       BONIFICACIONES           ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/bonificaciones', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM bonificaciones');
});

app.post('/bonificaciones', (req, res) => {
    const nuevaBonificacion = req.body;
    handleInsertQuery(res, 'INSERT INTO bonificaciones SET ?', nuevaBonificacion);
});

app.put('/bonificaciones/:id', (req, res) => {
    const id = req.params.id;
    const nuevaBonificacion = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE bonificaciones SET ? WHERE id = ?', [nuevaBonificacion, id]);
});

app.delete('/bonificaciones/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM bonificaciones WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////         PELUQUERÍAS            //////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/peluquerias', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM peluquerias');
});

app.post('/peluquerias', (req, res) => {
    const nuevaPeluqueria = req.body;
    handleInsertQuery(res, 'INSERT INTO peluquerias SET ?', nuevaPeluqueria);
});

app.put('/peluquerias/:id', (req, res) => {
    const id = req.params.id;
    const nuevaPeluqueria = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE peluquerias SET ? WHERE id = ?', [nuevaPeluqueria, id]);
});

app.delete('/peluquerias/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM peluquerias WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////        RESERVACIONES          ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/reservaciones', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM reservaciones');
});

app.post('/reservaciones', (req, res) => {
    const nuevaReservacion = req.body;
    handleInsertQuery(res, 'INSERT INTO reservaciones SET ?', nuevaReservacion);
});

app.put('/reservaciones/:id', (req, res) => {
    const id = req.params.id;
    const nuevaReservacion = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE reservaciones SET ? WHERE id = ?', [nuevaReservacion, id]);
});

app.delete('/reservaciones/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM reservaciones WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////         TIPOS DE PAGOS         ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/tipos-de-pagos', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM tipos_de_pagos');
});

app.post('/tipos-de-pagos', (req, res) => {
    const nuevoTipoPago = req.body;
    handleInsertQuery(res, 'INSERT INTO tipos_de_pagos SET ?', nuevoTipoPago);
});

app.put('/tipos-de-pagos/:id', (req, res) => {
    const id = req.params.id;
    const nuevoTipoPago = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE tipos_de_pagos SET ? WHERE id = ?', [nuevoTipoPago, id]);
});

app.delete('/tipos-de-pagos/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM tipos_de_pagos WHERE id = ?', id);
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////            CUENTAS             //////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/cuentas', (req, res) => {
    handleSelectQuery(res, 'SELECT * FROM cuentas');
});

app.post('/cuentas', (req, res) => {
    const nuevaCuenta = req.body;
    handleInsertQuery(res, 'INSERT INTO cuentas SET ?', nuevaCuenta);
});

app.put('/cuentas/:id', (req, res) => {
    const id = req.params.id;
    const nuevaCuenta = req.body;
    handleUpdateDeleteQuery(res, 'UPDATE cuentas SET ? WHERE id = ?', [nuevaCuenta, id]);
});

app.delete('/cuentas/:id', (req, res) => {
    const id = req.params.id;
    handleUpdateDeleteQuery(res, 'DELETE FROM cuentas WHERE id = ?', id);
});


app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});
