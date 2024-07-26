CREATE DATABASE `peluqueria`;
-- -----------------------------------------------------
USE `peluqueria` ;


-- Estructura de tabla para la tabla `empleados`
CREATE TABLE `empleados` (
  `id` int NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `local` text,
  `horario` varchar(45) DEFAULT NULL,
  `puesto` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Estructura de tabla para la tabla `cortes`
CREATE TABLE `cortes` (
  `id` int NOT NULL,
  `nombre_corte` varchar(45) DEFAULT NULL,
  `id_empleado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_empleado_fk` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`)
);

-- Estructura de tabla para la tabla `clientes`
CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `nombres` varchar(45) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `contrasena` varchar(50) NOT NULL DEFAULT '0000',
  `peluquero_asignado` int DEFAULT NULL,
  `id_corte` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `peluquero_asignado_fk` FOREIGN KEY (`peluquero_asignado`) REFERENCES `empleados` (`id`),
  CONSTRAINT `id_corte_fk` FOREIGN KEY (`id_corte`) REFERENCES `cortes` (`id`)
);

-- Estructura de tabla para la tabla `historiales`
CREATE TABLE `historiales` (
  `id` int NOT NULL,
  `cantidad_citas` int DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_cliente_fk` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
);

-- Estructura de tabla para la tabla `bonificaciones`
CREATE TABLE `bonificaciones` (
  `id` int NOT NULL,
  `descuento` int DEFAULT NULL,
  `cuponGratis` varchar(45) DEFAULT NULL,
  `id_historial` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_historial_fk` FOREIGN KEY (`id_historial`) REFERENCES `historiales` (`id`)
);

-- Estructura de tabla para la tabla `peluquerias`
CREATE TABLE `peluquerias` (
  `id` int NOT NULL,
  `nombre` text DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `id_empleados` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_empleados_fk` FOREIGN KEY (`id_empleados`) REFERENCES `empleados` (`id`)
);

-- Estructura de tabla para la tabla `reservaciones`
CREATE TABLE `reservaciones` (
  `id` int NOT NULL,
  `horario` datetime DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_cliente_fk1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
);

-- Estructura de tabla para la tabla `tipos_de_pagos`
CREATE TABLE `tipos_de_pagos` (
  `id` int NOT NULL,
  `debito` tinyint(1) DEFAULT NULL,
  `credito` tinyint(1) DEFAULT NULL,
  `efectivo` tinyint(1) DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_cliente_fk2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
);

-- Estructura de tabla para la tabla `cuentas`
CREATE TABLE `cuentas` (
  `id` int NOT NULL,
  `id_pagos` int DEFAULT NULL,
  `saldo` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_pagos_fk` FOREIGN KEY (`id_pagos`) REFERENCES `tipos_de_pagos` (`id`)
);
