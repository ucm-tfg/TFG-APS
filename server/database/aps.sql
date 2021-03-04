-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-12-2020 a las 21:06:39
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aps`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncio_servicio`
--

CREATE TABLE `anuncio_servicio` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(1200) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `_v` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `anuncio_servicio`
--

INSERT INTO `anuncio_servicio` (`id`, `titulo`, `descripcion`, `imagen`, `created_at`, `updated_at`, `_v`) VALUES
(1, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:16:28', '2020-12-15 19:16:28', 0.9),
(2, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:17:09', '2020-12-15 19:17:09', 0.9),
(3, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:17:30', '2020-12-15 19:17:30', 0.9),
(4, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:22:02', '2020-12-15 19:22:02', 0.9),
(5, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:23:08', '2020-12-15 19:23:08', 0.9),
(6, '', '', '', '2020-12-15 19:28:28', '2020-12-15 19:28:28', 0.9),
(7, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:30:23', '2020-12-15 19:30:23', 0.9),
(8, 'Anuncio 1', 'Prueba 1', 'Prueba, aquí va la dirección de la imagen', '2020-12-15 19:32:00', '2020-12-15 19:32:00', 0.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areaconocimiento_profesor`
--

CREATE TABLE `areaconocimiento_profesor` (
  `id_area` int(11) NOT NULL,
  `id_profesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areaservicio_anuncioservicio`
--

CREATE TABLE `areaservicio_anuncioservicio` (
  `id_area` int(11) NOT NULL,
  `id_anuncio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `areaservicio_anuncioservicio`
--

INSERT INTO `areaservicio_anuncioservicio` (`id_area`, `id_anuncio`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areaservicio_iniciativa`
--

CREATE TABLE `areaservicio_iniciativa` (
  `id_area` int(11) NOT NULL,
  `id_iniciativa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area_conocimiento`
--

CREATE TABLE `area_conocimiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area_servicio`
--

CREATE TABLE `area_servicio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `area_servicio`
--

INSERT INTO `area_servicio` (`id`, `nombre`) VALUES
(0, 'TECNOLÓGICA'),
(1, 'TECNOLÓGICA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaboracion`
--

CREATE TABLE `colaboracion` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(1200) NOT NULL,
  `admite_externos` tinyint(1) NOT NULL DEFAULT 0,
  `responsable` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demanda_servicio`
--

CREATE TABLE `demanda_servicio` (
  `id` int(11) NOT NULL,
  `creador` int(11) NOT NULL,
  `ciudad` varchar(200) NOT NULL,
  `finalidad` varchar(200) NOT NULL,
  `periodo_definicion_ini` date NOT NULL,
  `periodo_definicion_fin` date NOT NULL,
  `periodo_ejecucion_ini` date NOT NULL,
  `periodo_ejecucion_fin` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `observaciones_temporales` varchar(1200) NOT NULL,
  `necesidad_social` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad`
--

CREATE TABLE `entidad` (
  `id` int(11) NOT NULL,
  `sector` varchar(200) NOT NULL,
  `nombre_entidad` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_externo`
--

CREATE TABLE `estudiante_externo` (
  `id` int(11) NOT NULL,
  `universidad` int(11) NOT NULL,
  `titulacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_interno`
--

CREATE TABLE `estudiante_interno` (
  `id` int(11) NOT NULL,
  `titulacion_local` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_proyecto`
--

CREATE TABLE `estudiante_proyecto` (
  `id_estudiante` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iniciativa`
--

CREATE TABLE `iniciativa` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` varchar(1200) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_demanda` int(11) NOT NULL,
  `necesidad_social` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mail`
--

CREATE TABLE `mail` (
  `id` int(11) NOT NULL,
  `mail_to` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `mail_name` varchar(200) NOT NULL,
  `mail_from` varchar(200) NOT NULL,
  `subject` varchar(1200) NOT NULL,
  `html` varchar(1200) NOT NULL,
  `_to` varchar(200) NOT NULL,
  `usuario` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL,
  `texto` varchar(1200) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`id`, `texto`, `fecha`, `usuario`) VALUES
(1, 'Mensaje 1', '2020-12-16 19:29:03', 1),
(3, 'Mensaje 2', '2020-12-16 19:30:22', 3),
(4, 'Mensaje 3', '2020-12-16 19:30:22', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_anuncioservicio`
--

CREATE TABLE `mensaje_anuncioservicio` (
  `id_mensaje` int(11) NOT NULL,
  `id_anuncio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensaje_anuncioservicio`
--

INSERT INTO `mensaje_anuncioservicio` (`id_mensaje`, `id_anuncio`) VALUES
(1, 1),
(3, 1),
(4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_colaboracion`
--

CREATE TABLE `mensaje_colaboracion` (
  `id_mensaje` int(11) NOT NULL,
  `id_colaboracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `necesidad_social`
--

CREATE TABLE `necesidad_social` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `mail_to` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta_servicio`
--

CREATE TABLE `oferta_servicio` (
  `id` int(11) NOT NULL,
  `asignatura_objetivo` varchar(200) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `anio_academico` int(11) NOT NULL,
  `fecha_limite` date NOT NULL,
  `observaciones_temporales` varchar(1200) NOT NULL,
  `creador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `oferta_servicio`
--

INSERT INTO `oferta_servicio` (`id`, `asignatura_objetivo`, `cuatrimestre`, `anio_academico`, `fecha_limite`, `observaciones_temporales`, `creador`) VALUES
(1, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(2, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(3, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(4, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(5, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(7, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1),
(8, 'Ampliación de Matemáticas', 1, 2020, '2021-11-04', 'URGENTE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinaaps`
--

CREATE TABLE `oficinaaps` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partenariado`
--

CREATE TABLE `partenariado` (
  `id` int(11) NOT NULL,
  `id_demanda` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL,
  `estado` enum('EN_NEGOCIACION','ACORDADO','SUSPENDIDO','') NOT NULL,
  `_v` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorinterno_oferta`
--

CREATE TABLE `profesorinterno_oferta` (
  `id_profesor` int(11) NOT NULL,
  `id_oferta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_colaboracion`
--

CREATE TABLE `profesor_colaboracion` (
  `id_profesor` int(11) NOT NULL,
  `id_colaboracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_externo`
--

CREATE TABLE `profesor_externo` (
  `id` int(11) NOT NULL,
  `universidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor_interno`
--

CREATE TABLE `profesor_interno` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor_interno`
--

INSERT INTO `profesor_interno` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL,
  `id_partenariado` int(11) NOT NULL,
  `estado` enum('ABIERTO','CERRADO','EN_CURSO','FINALIZADO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacionlocal_demanda`
--

CREATE TABLE `titulacionlocal_demanda` (
  `id_titulacion` int(11) NOT NULL,
  `id_demanda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacionlocal_profesor`
--

CREATE TABLE `titulacionlocal_profesor` (
  `id_titulacion` int(11) NOT NULL,
  `id_profesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulacion_local`
--

CREATE TABLE `titulacion_local` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidad`
--

CREATE TABLE `universidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `provincia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `upload`
--

CREATE TABLE `upload` (
  `id` int(11) NOT NULL,
  `almacenamiento` varchar(200) NOT NULL,
  `campo` varchar(200) NOT NULL,
  `tipo` varchar(200) NOT NULL,
  `tipo_id` varchar(200) NOT NULL,
  `path` varchar(200) NOT NULL,
  `client_name` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `creador` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `_v` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `uploads_colaboracion`
--

CREATE TABLE `uploads_colaboracion` (
  `id_upload` int(11) NOT NULL,
  `id_colaboracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `upload_anuncioservicio`
--

CREATE TABLE `upload_anuncioservicio` (
  `id_upload` int(11) NOT NULL,
  `id_anuncio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `origin_login` varchar(200) NOT NULL,
  `origin_img` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `terminos_aceptados` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `nombre`, `apellidos`, `password`, `origin_login`, `origin_img`, `createdAt`, `updatedAt`, `terminos_aceptados`) VALUES
(1, 'vgnatuk@ucm.es', 'Victoria', 'Gnatiuk', '123', 'prueba', 'prueba', '2020-12-15 19:13:41', '2020-12-15 19:13:41', 1),
(3, 'baba@ucm.es', 'Daniela', 'Bolder', '123', 'prueba', 'prueba', '2020-12-15 19:14:48', '2020-12-15 19:14:48', 1),
(4, 'gaga@ucm.es', 'Jesus', 'Granado', '123', 'prueba', 'prueba', '2020-12-15 19:14:48', '2020-12-15 19:14:48', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `anuncio_servicio`
--
ALTER TABLE `anuncio_servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `areaconocimiento_profesor`
--
ALTER TABLE `areaconocimiento_profesor`
  ADD PRIMARY KEY (`id_area`,`id_profesor`),
  ADD KEY `area_conocimiento-profesor_ibfk_1` (`id_profesor`);

--
-- Indices de la tabla `areaservicio_anuncioservicio`
--
ALTER TABLE `areaservicio_anuncioservicio`
  ADD PRIMARY KEY (`id_area`,`id_anuncio`),
  ADD KEY `area_servicio-anuncio_servicio_ibfk_1` (`id_anuncio`);

--
-- Indices de la tabla `areaservicio_iniciativa`
--
ALTER TABLE `areaservicio_iniciativa`
  ADD PRIMARY KEY (`id_area`,`id_iniciativa`),
  ADD KEY `area_servicio-iniciativa_ibfk_2` (`id_iniciativa`);

--
-- Indices de la tabla `area_conocimiento`
--
ALTER TABLE `area_conocimiento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `area_servicio`
--
ALTER TABLE `area_servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colaboracion`
--
ALTER TABLE `colaboracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `responsable` (`responsable`) USING BTREE;

--
-- Indices de la tabla `demanda_servicio`
--
ALTER TABLE `demanda_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creador` (`creador`) USING BTREE,
  ADD KEY `necesidad_social` (`necesidad_social`) USING BTREE;

--
-- Indices de la tabla `entidad`
--
ALTER TABLE `entidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudiante_externo`
--
ALTER TABLE `estudiante_externo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `universidad` (`universidad`) USING BTREE,
  ADD KEY `titulacion` (`titulacion`) USING BTREE;

--
-- Indices de la tabla `estudiante_interno`
--
ALTER TABLE `estudiante_interno`
  ADD PRIMARY KEY (`id`),
  ADD KEY `titulacion_local` (`titulacion_local`) USING BTREE;

--
-- Indices de la tabla `estudiante_proyecto`
--
ALTER TABLE `estudiante_proyecto`
  ADD PRIMARY KEY (`id_estudiante`,`id_proyecto`),
  ADD KEY `id_estudiante` (`id_estudiante`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `iniciativa`
--
ALTER TABLE `iniciativa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_demanda` (`id_demanda`) USING BTREE,
  ADD KEY `id_estudiante` (`id_estudiante`) USING BTREE,
  ADD KEY `necesidad_social` (`necesidad_social`) USING BTREE;

--
-- Indices de la tabla `mail`
--
ALTER TABLE `mail`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `mensaje_anuncioservicio`
--
ALTER TABLE `mensaje_anuncioservicio`
  ADD PRIMARY KEY (`id_mensaje`,`id_anuncio`),
  ADD KEY `id_anuncio` (`id_anuncio`);

--
-- Indices de la tabla `mensaje_colaboracion`
--
ALTER TABLE `mensaje_colaboracion`
  ADD PRIMARY KEY (`id_mensaje`,`id_colaboracion`),
  ADD KEY `id_colaboracion` (`id_colaboracion`);

--
-- Indices de la tabla `necesidad_social`
--
ALTER TABLE `necesidad_social`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estudiante` (`id_estudiante`) USING BTREE,
  ADD KEY `proyecto_notas` (`id_proyecto`) USING BTREE;

--
-- Indices de la tabla `oferta_servicio`
--
ALTER TABLE `oferta_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creador` (`creador`) USING BTREE;

--
-- Indices de la tabla `oficinaaps`
--
ALTER TABLE `oficinaaps`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partenariado`
--
ALTER TABLE `partenariado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_demanda` (`id_demanda`) USING BTREE,
  ADD KEY `id_oferta` (`id_oferta`) USING BTREE;

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesorinterno_oferta`
--
ALTER TABLE `profesorinterno_oferta`
  ADD PRIMARY KEY (`id_profesor`,`id_oferta`),
  ADD KEY `id_profesor` (`id_profesor`),
  ADD KEY `id_oferta` (`id_oferta`);

--
-- Indices de la tabla `profesor_colaboracion`
--
ALTER TABLE `profesor_colaboracion`
  ADD PRIMARY KEY (`id_profesor`,`id_colaboracion`),
  ADD KEY `profesor_colaboracion_ibfk_1` (`id_colaboracion`);

--
-- Indices de la tabla `profesor_externo`
--
ALTER TABLE `profesor_externo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `universidad` (`universidad`) USING BTREE;

--
-- Indices de la tabla `profesor_interno`
--
ALTER TABLE `profesor_interno`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_partenariado` (`id_partenariado`) USING BTREE;

--
-- Indices de la tabla `titulacionlocal_demanda`
--
ALTER TABLE `titulacionlocal_demanda`
  ADD PRIMARY KEY (`id_titulacion`,`id_demanda`),
  ADD KEY `titulacion_local-demanda_ibfk_2` (`id_demanda`);

--
-- Indices de la tabla `titulacionlocal_profesor`
--
ALTER TABLE `titulacionlocal_profesor`
  ADD PRIMARY KEY (`id_titulacion`,`id_profesor`),
  ADD KEY `titulacion_local-profesor_ibfk_2` (`id_profesor`);

--
-- Indices de la tabla `titulacion_local`
--
ALTER TABLE `titulacion_local`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `universidad`
--
ALTER TABLE `universidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creador` (`creador`);

--
-- Indices de la tabla `uploads_colaboracion`
--
ALTER TABLE `uploads_colaboracion`
  ADD PRIMARY KEY (`id_upload`,`id_colaboracion`),
  ADD KEY `id_upload` (`id_upload`),
  ADD KEY `id_colaboracion` (`id_colaboracion`);

--
-- Indices de la tabla `upload_anuncioservicio`
--
ALTER TABLE `upload_anuncioservicio`
  ADD PRIMARY KEY (`id_upload`,`id_anuncio`),
  ADD KEY `id_upload` (`id_upload`),
  ADD KEY `id_anuncio` (`id_anuncio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncio_servicio`
--
ALTER TABLE `anuncio_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `colaboracion`
--
ALTER TABLE `colaboracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iniciativa`
--
ALTER TABLE `iniciativa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mail`
--
ALTER TABLE `mail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `upload`
--
ALTER TABLE `upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FKEY_Admin` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `areaconocimiento_profesor`
--
ALTER TABLE `areaconocimiento_profesor`
  ADD CONSTRAINT `area_conocimiento` FOREIGN KEY (`id_area`) REFERENCES `area_conocimiento` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `area_conocimiento-profesor_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor_interno` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `areaservicio_anuncioservicio`
--
ALTER TABLE `areaservicio_anuncioservicio`
  ADD CONSTRAINT `area_servicio` FOREIGN KEY (`id_area`) REFERENCES `area_servicio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `area_servicio-anuncio_servicio_ibfk_1` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio_servicio` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `areaservicio_iniciativa`
--
ALTER TABLE `areaservicio_iniciativa`
  ADD CONSTRAINT `area_servicio-iniciativa_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area_servicio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `area_servicio-iniciativa_ibfk_2` FOREIGN KEY (`id_iniciativa`) REFERENCES `iniciativa` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `colaboracion`
--
ALTER TABLE `colaboracion`
  ADD CONSTRAINT `colaboracion_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `profesor_interno` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `demanda_servicio`
--
ALTER TABLE `demanda_servicio`
  ADD CONSTRAINT `demanda_anuncio` FOREIGN KEY (`id`) REFERENCES `anuncio_servicio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `demanda_servicio_ibfk_1` FOREIGN KEY (`necesidad_social`) REFERENCES `necesidad_social` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `demanda_servicio_ibfk_2` FOREIGN KEY (`creador`) REFERENCES `entidad` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `entidad`
--
ALTER TABLE `entidad`
  ADD CONSTRAINT `FKEY_Entidad` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `FKEY_Estudiante` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante_externo`
--
ALTER TABLE `estudiante_externo`
  ADD CONSTRAINT `FKEY_Estudiante_externo` FOREIGN KEY (`id`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_externo_ibfk_2` FOREIGN KEY (`universidad`) REFERENCES `universidad` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante_interno`
--
ALTER TABLE `estudiante_interno`
  ADD CONSTRAINT `FKEY_Estudiante_interno` FOREIGN KEY (`id`) REFERENCES `estudiante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_interno_ibfk_1` FOREIGN KEY (`titulacion_local`) REFERENCES `titulacion_local` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante_proyecto`
--
ALTER TABLE `estudiante_proyecto`
  ADD CONSTRAINT `estudiante_proyecto_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_proyecto_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `iniciativa`
--
ALTER TABLE `iniciativa`
  ADD CONSTRAINT `iniciativa_ibfk_1` FOREIGN KEY (`necesidad_social`) REFERENCES `necesidad_social` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `iniciativa_ibfk_2` FOREIGN KEY (`id_demanda`) REFERENCES `demanda_servicio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `iniciativa_ibfk_3` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje_anuncioservicio`
--
ALTER TABLE `mensaje_anuncioservicio`
  ADD CONSTRAINT `mensaje_anuncioservicio_ibfk_1` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio_servicio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `mensaje_anuncioservicio_ibfk_2` FOREIGN KEY (`id_mensaje`) REFERENCES `mensaje` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje_colaboracion`
--
ALTER TABLE `mensaje_colaboracion`
  ADD CONSTRAINT `mensaje_colaboracion_ibfk_1` FOREIGN KEY (`id_colaboracion`) REFERENCES `colaboracion` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `mensaje_colaboracion_ibfk_2` FOREIGN KEY (`id_mensaje`) REFERENCES `mensaje` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `FKEY_Estudiante_notas` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FKEY_proyecto_notas` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `oferta_servicio`
--
ALTER TABLE `oferta_servicio`
  ADD CONSTRAINT `oferta-anuncio` FOREIGN KEY (`id`) REFERENCES `anuncio_servicio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `oferta_servicio_ibfk_2` FOREIGN KEY (`creador`) REFERENCES `profesor_interno` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `oficinaaps`
--
ALTER TABLE `oficinaaps`
  ADD CONSTRAINT `FKEY_Oficina` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `partenariado`
--
ALTER TABLE `partenariado`
  ADD CONSTRAINT `partenariado-colaboracion` FOREIGN KEY (`id`) REFERENCES `colaboracion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `partenariado-demanda` FOREIGN KEY (`id_demanda`) REFERENCES `demanda_servicio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `partenariado-oferta` FOREIGN KEY (`id_oferta`) REFERENCES `oferta_servicio` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `FKEY_Profesor` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesorinterno_oferta`
--
ALTER TABLE `profesorinterno_oferta`
  ADD CONSTRAINT `profesorinterno_oferta_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor_interno` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `profesorinterno_oferta_ibfk_2` FOREIGN KEY (`id_oferta`) REFERENCES `oferta_servicio` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_colaboracion`
--
ALTER TABLE `profesor_colaboracion`
  ADD CONSTRAINT `FKEY_Profesor_colaboracion1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `profesor_colaboracion_ibfk_1` FOREIGN KEY (`id_colaboracion`) REFERENCES `colaboracion` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_externo`
--
ALTER TABLE `profesor_externo`
  ADD CONSTRAINT `profesor_externo_ibfk_1` FOREIGN KEY (`id`) REFERENCES `profesor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profesor_externo_ibfk_2` FOREIGN KEY (`universidad`) REFERENCES `universidad` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `profesor_interno`
--
ALTER TABLE `profesor_interno`
  ADD CONSTRAINT `FKEY_Profesor_interno` FOREIGN KEY (`id`) REFERENCES `profesor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto-colaboracion` FOREIGN KEY (`id`) REFERENCES `colaboracion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proyecto-partenariado` FOREIGN KEY (`id_partenariado`) REFERENCES `partenariado` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `titulacionlocal_demanda`
--
ALTER TABLE `titulacionlocal_demanda`
  ADD CONSTRAINT `titulacion_local-demanda_ibfk_1` FOREIGN KEY (`id_titulacion`) REFERENCES `titulacion_local` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `titulacion_local-demanda_ibfk_2` FOREIGN KEY (`id_demanda`) REFERENCES `demanda_servicio` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `titulacionlocal_profesor`
--
ALTER TABLE `titulacionlocal_profesor`
  ADD CONSTRAINT `titulacion_local-profesor_ibfk_1` FOREIGN KEY (`id_titulacion`) REFERENCES `titulacion_local` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `titulacion_local-profesor_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesor_interno` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `upload`
--
ALTER TABLE `upload`
  ADD CONSTRAINT `upload_ibfk_1` FOREIGN KEY (`creador`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `uploads_colaboracion`
--
ALTER TABLE `uploads_colaboracion`
  ADD CONSTRAINT `uploads_colaboracion_ibfk_1` FOREIGN KEY (`id_upload`) REFERENCES `upload` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `uploads_colaboracion_ibfk_2` FOREIGN KEY (`id_colaboracion`) REFERENCES `colaboracion` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `upload_anuncioservicio`
--
ALTER TABLE `upload_anuncioservicio`
  ADD CONSTRAINT `upload_anuncioservicio_ibfk_1` FOREIGN KEY (`id_upload`) REFERENCES `upload` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `upload_anuncioservicio_ibfk_2` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio_servicio` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
