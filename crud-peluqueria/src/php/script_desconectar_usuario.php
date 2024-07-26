<?php
session_start();

if (isset($_SESSION['nombres']) && !empty($_SESSION['nombres'])) {
    session_destroy();
    echo '<script type="text/javascript">
        alert("Su sesión ha terminado correctamente");
        window.location.href = "../index.html";
    </script>';
} else {
    echo '<script type="text/javascript">
        alert("No ha iniciado ninguna sesión, por favor regístrese");
        window.location.href = "../index.html";
    </script>';
}
?>
