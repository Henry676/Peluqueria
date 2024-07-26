<?php
$mysqli = new mysqli("localhost", "root", "1234", "peluqueria");

if ($mysqli->connect_error) {
    die("No se pudo conectar a la base de datos: " . $mysqli->connect_error);
}

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$contrasena = $_POST['contrasena'];

    if (empty($nombre) || empty($apellido) || empty($contrasena)) {
        echo '<script type="text/javascript">
        alert("Por favor, complete todos los campos.");
        window.history back();
        </script>';
    } else {
        $consulta = "INSERT INTO clientes (nombres, apellidos, contrasena) VALUES ('$nombre', '$apellido', '$contrasena')";

        if ($mysqli->query($consulta) === true) {
            header("Location: ../index.html");
        } else {
            echo "Error en el registro: " . $mysqli->error;
        }
    }

$mysqli->close();
?>
