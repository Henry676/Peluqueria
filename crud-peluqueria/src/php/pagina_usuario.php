<?php
session_start();

$mysqli = new mysqli("localhost", "root", "1234", "peluqueria");
if ($mysqli->connect_error) {
    die("No se pudo conectar a la base de datos: " . $mysqli->connect_error);
}

if (!isset($_SESSION['nombres'])) {
    header("Location: ../index.html");
    exit;
}

$id = $_SESSION['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apellidos = $_POST['apellidos'];
    $id_corte = $_POST['id_corte'];
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];

    // Calcular la fecha y hora límite inferior (20 minutos antes)
    $limite_inferior = date('Y-m-d H:i:s', strtotime("$fecha $hora -20 minutes"));

    // Calcular la fecha y hora límite superior (20 minutos después)
    $limite_superior = date('Y-m-d H:i:s', strtotime("$fecha $hora +20 minutes"));

    // Verificar si hay reservas en el rango de tiempo
    $reservas_en_rango = $mysqli->query("SELECT * FROM reservaciones 
                                        WHERE id_cliente = $id
                                        AND horario BETWEEN '$limite_inferior' AND '$limite_superior'");

    if ($reservas_en_rango->num_rows > 0) {
        // Hay una reserva en el rango de tiempo, no se permite crear o cambiar
        echo '<script type="text/javascript">
        alert("Error: Ya existe una reserva en el rango de tiempo especificado (20 minutos menos o 20 minutos más).");
        window.history.back();
        </script>';
    } else {
        // Realizar una consulta JOIN para obtener información del corte y del cliente
        $consulta = "SELECT clientes.apellidos, cortes.id_empleado
                    FROM clientes
                    INNER JOIN cortes ON clientes.id_corte = cortes.id
                    WHERE clientes.id = $id";

        $resultado = $mysqli->query($consulta);

        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            $apellidos_antiguos = $fila['apellidos'];
            $id_peluquero = $fila['id_empleado'];

            // Actualizar los datos del cliente con la información del corte y peluquero
            $consulta = "UPDATE clientes SET apellidos = '$apellidos', peluquero_asignado = '$id_peluquero', id_corte = $id_corte WHERE id = $id";
            $mysqli->query($consulta);

            // Actualizar la reserva (o crear una nueva si no existe)
            $reserva_existente = $mysqli->query("SELECT * FROM reservaciones WHERE id_cliente = $id");

            if ($reserva_existente->num_rows > 0) {
                $mysqli->query("UPDATE reservaciones SET horario = '$fecha $hora' WHERE id_cliente = $id");
            } else {
                $mysqli->query("INSERT INTO reservaciones (horario, id_cliente) VALUES ('$fecha $hora', $id)");
            }
        } else {
            // Manejo de errores si no se encuentra el cliente o el corte
            echo "Error: No se encontró el cliente o el corte asociado.";
        }
    }
}

$consulta = "SELECT * FROM clientes WHERE id = $id";
$resultado = $mysqli->query($consulta);

if (!$resultado) {
    die("Error en la consulta: " . $mysqli->error);
}

$fila = $resultado->fetch_assoc();
$apellidos = $fila['apellidos'];
$corte_actual = $fila['id_corte'];
$resultado->free();

// Consulta para obtener la lista de cortes disponibles
$consulta_cortes = "SELECT id, nombre_corte FROM cortes";
$resultado_cortes = $mysqli->query($consulta_cortes);
$cortes = $resultado_cortes->fetch_all(MYSQLI_ASSOC);

$mysqli->close();
?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Página de Usuario</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <script src="../js/jquery.min.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <style>
        body {
            background-color: #414242;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .navbar {
            background-color: #313233;
        }

        footer {
            background-color: #343a40;
            color: white;
            text-align: center;
            padding: 10px 0;
        }

        .container-main {
            text-align: center;
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="index.html">Inicio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="../html/contacto.html">Contacto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/nosotros.html">Nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/registro_usuario.html">Registro</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container-main">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="text-right text-white"><br>
                        Usuario: <strong>
                            <?= $_SESSION['nombres']; ?>
                        </strong>
                        <a href="script_desconectar_usuario.php" class="ml-2">Cerrar Sesión</a>
                    </div>
                </div>
                <div class="col-12 text-center text-white">
                    <h3>Peluqueria Cetiano</h3>
                </div>
                <div class="col-12 mt-3">
                    <form method="post">
                        <div class="form-group  text-white">
                            <label for="apellidos">Apellidos:</label>
                            <input type="text" name="apellidos" value="<?= $apellidos; ?>" class="form-control">
                        </div>
                        <div class="form-group text-white">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="fecha">Fecha de cita:</label>
                                    <input type="date" name="fecha" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label for="hora">Hora de cita:</label>
                                    <input type="time" name="hora" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-white">
                            <label for="id_corte">Selecciona un corte:</label>
                            <select name="id_corte" class="form-control">
                                <?php
                            if (count($cortes) > 0) {
                                foreach ($cortes as $index => $corte) {
                                    $selected = ($index === $corte_actual - 1) ? 'selected' : '';
                                    echo '<option value="' . $corte['id'] . '" ' . $selected . '>' . $corte['nombre_corte'] . '</option>';
                                }
                            } else {
                                echo '<option value="-1">No hay cortes disponibles</option>';
                            }
                            ?>
                            </select>
                        </div>
                        <input type="submit" value="Actualizar Datos" class="btn btn-secondary">
                    </form>
                    <div class="col-12 mt-3">
                        <h3 class="text-white">Cortes</h3>
                        <div id="cortes" class="carousel slide" data-ride="carousel" data-interval="5000"> <!-- Agregar data-interval -->
                            <div class="carousel-inner" style="max-width: 500px; max-height: 500px;">
                                <div class="carousel-item active">
                                    <img src="../img/cortes/img1.png" class="d-block w-100" alt="Corte Militar">
                                </div>
                                <div class="carousel-item">
                                    <img src="../img/cortes/img2.png" class="d-block w-100" alt="Corte Moicano">
                                </div>
                                <div class="carousel-item">
                                    <img src="../img/cortes/img3.png" class="d-block w-100" alt="Corte a Pelon">
                                </div>
                                <div class="carousel-item">
                                    <img src="../img/cortes/img4.png" class="d-block w-100" alt="Corte Afro">
                                </div>
                                <div class="carousel-item">
                                    <img src="../img/cortes/img5.png" class="d-block w-100" alt="¡Que esperas!">
                                </div>
                            </div>
                            <button class="carousel-control-prev btn-secondary" data-target="#cortes" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Anterior</span>
                            </button>
                            <button class="carousel-control-next btn-secondary" data-target="#cortes" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Siguiente</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="text-white text-center py-3">
        <div class="container">
            &copy; 2023 Peluqueria "El cetiano"
        </div>
    </footer>
</body>

</html>
