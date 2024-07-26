<?php
// Iniciar la sesión si no está activa
if (!isset($_SESSION)) {
  session_start();
}

// Validar si el usuario ha iniciado sesión
if (!isset($_SESSION['nombres'])) {
  echo '<script type="text/javascript">
      alert("Usuario no autenticado");
      window.location.href = "../index.html";
  </script>';
}

//Modelo

$mysqli = new mysqli("localhost", "root", "1234", "sesiones");

if ($mysqli->connect_error) {
    die("No se pudo conectar a la base de datos: " . $mysqli->connect_error);
}

function guardarCambios($mysqli, $id_usuario, $nombres, $apellidos, $edad, $usuario, $es_admin){
        $consulta = "UPDATE usuarios 
                     SET nombres = '$nombres', apellidos = '$apellidos', edad = $edad, usuario = '$usuario', es_admin = $es_admin
                     WHERE id_usuario = $id_usuario";
        return $mysqli->query($consulta);
      }


function obtenerUsuarios($mysqli){
        $consulta = "SELECT id_usuario, nombres, apellidos, edad, usuario, es_admin FROM usuarios";
        $resultado = $mysqli->query($consulta);
        $usuarios = array();
        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $usuarios[] = $fila;
            }
        }
        return $usuarios;
    }

function eliminarUsuario($mysqli, $id_usuario)
    {
        $consulta = "DELETE FROM usuarios WHERE id_usuario = $id_usuario";
        return $mysqli->query($consulta);
    }

//Controlador

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['guardar'])) {
        $id_usuario = $_POST['id_usuario'];
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $edad = $_POST['edad'];
        $usuario = $_POST['usuario'];
        $es_admin = isset($_POST['es_admin']) ? 1 : 0;

        if (guardarCambios($mysqli, $id_usuario, $nombres, $apellidos, $edad, $usuario, $es_admin)) {
            header("Location: " . $_SERVER['REQUEST_URI']);
        } else {
            echo "Error al guardar los cambios.";
        }
    }

    if (isset($_POST['eliminar'])) {
        $id_usuario = $_POST['id_usuario'];

        if (eliminarUsuario($mysqli, $id_usuario)) {
            header("Location: " . $_SERVER['REQUEST_URI']);
        } else {
            echo "Error al eliminar el usuario.";
        }
    }
}
?>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Página de Usuario</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<style>
    .container-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .content-container {
        margin: 20px;
    }
</style>
</head>
<body>
<div class="container-center">
    <div class="content-container">
        <h2>Lista de Usuarios Registrados</h2>
        <table class="table table-striped">
            <tr>
                <td colspan="2"><div align="right">Usuario: <span class="Estilo6"><strong><?= $_SESSION['nombres']; ?></strong></span></div></td>
                <td colspan="2"><div align="right"><a href="script_desconectar_usuario.php">Cerrar Sesión</a></div></td>
            </tr>
        </table>
        <table class="table table-striped">
            <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Edad</th>
                <th>Usuario</th>
                <th>Es Admin</th>
                <th>Guardar</th>
                <th>Eliminar</th>
            </tr>

            <?php

            $usuarios = obtenerUsuarios($mysqli);

            foreach ($usuarios as $fila) {
                echo "<form method='post'>";
                echo "<tr>";
                echo "<td>" . $fila['id_usuario'] . "</td>";
                //nombre
                echo "<td><input type='text' name='nombres' value='" . $fila['nombres'] . "'></td>";
                //apellidos
                echo "<td><input type='text' name='apellidos' value='" . $fila['apellidos'] . "'></td>";
                //edad
                echo "<td><input type='text' name='edad' value='" . $fila['edad'] . "'></td>";
                //usuario
                echo "<td><input type='text' name='usuario' value='" . $fila['usuario'] . "'></td>";
                //admin
                echo "<td><input type='checkbox' name='es_admin' " . ($fila['es_admin'] == 1 ? 'checked' : '') . "></td>";
                //botón de guardar
                echo "<td><input type='submit' name='guardar' value='Guardar' class='btn btn-primary'></td>";
                echo "<input type='hidden' name='id_usuario' value='" . $fila['id_usuario'] . "'>";
                //botón de eliminar que envía el ID del usuario a eliminar
                echo "<td><input type='submit' name='eliminar' value='Eliminar' class='btn btn-danger'></td>";
                echo "<input type='hidden' name='id_usuario' value='" . $fila['id_usuario'] . "'>";

                echo "</tr>";
                echo "</form>";
            }
            ?>
        </table>
    </div>
</div>
</body>
</html>
