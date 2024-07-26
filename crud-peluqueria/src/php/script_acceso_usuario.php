<?php

// Inicia la sesión
session_start();

// Establecer la conexión a la base de datos
$mysqli = new mysqli("localhost:3300", "root", "1234", "peluqueria");

// Verificar la conexión a la base de datos
if ($mysqli->connect_error) {
    die("No se pudo conectar a la base de datos: " . $mysqli->connect_error);
}

// Recibir los datos ingresados en el formulario
$nombres = $_POST['username']; 
$contrasena = $_POST['password']; 

// Consultar si los datos están guardados en la base de datos
$consulta = "SELECT * FROM clientes WHERE nombres='$nombres'";
$resultado = $mysqli->query($consulta);

$fila = mysqli_fetch_array($resultado);

if (empty($fila)) {
    // Si el usuario NO existe
    echo '<script type="text/javascript">
        alert("El usuario no existe, por favor regístrese.");
        window.location.href = "../html/registro_usuario.html";
    </script>';
} elseif ($fila['contrasena'] !== $contrasena) {
    // Si la contraseña es incorrecta
    echo '<script type="text/javascript">
        alert("Contraseña incorrecta, por favor verifique.");
        window.history.back();
    </script>';
} else {
    // Usuario logueado correctamente, definimos variables de sesión
    $_SESSION['id'] = $fila['id'];
    $_SESSION['nombres'] = $fila['nombres'];
    $_SESSION['id_corte'] = $fila['id_corte'];
    // Verificar si el usuario es administrador (es_admin = 1)
    //if ($fila['es_admin'] == 1) {
        // Redirigir a la página de administrador
    //    header("Location: pagina_administrador.php");
   // } else {
        // Redirigir a la página de usuario
        header("Location: pagina_usuario.php");
    //}
}
?>
