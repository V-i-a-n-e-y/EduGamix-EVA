-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2025 a las 01:34:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u779086120_edugamix`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `insignias` text DEFAULT NULL,
  `puntajes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`puntajes`)),
  `tiempos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tiempos`)),
  `grupo` varchar(50) DEFAULT NULL,
  `clase` varchar(50) DEFAULT NULL,
  `escuela` varchar(100) DEFAULT NULL,
  `logros` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`logros`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasena`, `insignias`, `puntajes`, `tiempos`, `grupo`, `clase`, `escuela`, `logros`) VALUES
(1, 'VALENTINA HERNANDEZ', 'morita.vianey@gmail.com', '$2y$10$Tgz3/Qndu3M1ehLRYGKg5uy2AwQgxe2rj8gz3LnGo75MK6uvklpnC', '', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'MONSERRAT MIRAMONTES', 'morita.vianey@gmail.com', '$2y$10$4Nxm7iQhgtYOlUX5P23.NeKCz../zu/L72QEoKUmDjIhJ9X2qMgKC', '', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Pedro', 'morita.vianey@gmail.com', '$2y$10$bzKRw8AKfDL/MxxnJzHiAOZb9r5G6DBjGpIIsWDnFhEmPNt.5BLrO', '', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'patricia', 'morita.vianey@gmail.com', '$2y$10$xhOtBcqcJdzd2i6RqGMMje27CkvjNBv./vpew80VKk7iL2bznsz6i', '', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Vianey', 'morita.vianey@gmail.com', '$2y$10$PysFXnTGdhfeK8nQoqWTd.WVByriD65sykPCeC6Ho.T48jtBMLfMa', '', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Mateo', 'morita.vianey@gmail.com', '$2y$10$nymFXdLIEpovaiO/1ILIL.72UUcfcawBpS8l7i2fd/Fmhxq/muPMa', '', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Brenda', 'morita@vianey.com', '$2y$10$O1gd07qW1cekAP0CK6ZkDOicRFdB/ntp.cAYVmP2GpCHMIxAYaAVG', '', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Adair', 'mateo@gnmail.com', '$2y$10$oLre6rFDzVym.miVVPeywun2Sj3JFztvIhnc/7vRnb810NQGUYOf6', '', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'VALERIA MONSERRAT', 'morita.vianey@gmail.com', '$2y$10$hl4AV.Ivs.oKqVk8lmNG1O8QF.V9YMQ7yOWPENa2gyNGIvYB3mAea', '', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Brenda Vianey', 'morita.vianey@gmail.com', '$2y$10$DCY8B.IiY4zjksWVnhOw0.t9TOHSqUkLCf1WVOwQdetAgZitnBdcy', '', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'vianey', 'morita.vianey@gmail.com', '$2y$10$FXMEMLMrrHWSr4t7/dtUKuMzVtIwa9Swt1bjn7zFVwZqdoIquUq8m', '', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'vianey', 'morita.vianey@gmail.com', '$2y$10$R6buRn2oXioB5S3rNYysJO9kpgTGDVf2j9XyGhwrdhKNZC5pJ3M3i', '', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Mariana', 'mariaperez@gmail.com', '$2y$10$tHdugilQf7eUVxn//cNDB.VsR63I53QcEra0re.hcHxqo2Y59h24a', '', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Vianey', 'morita.vianey@gmail.com', '$2y$10$Ui22eDV0gjVA5uPt4PyHzuFDJT/262fOxzkLl3lQXiAysKxHIMVRW', '', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Vianey Hernandez', 'morita.vianey@gmail.com', '$2y$10$Ae.rBWCA7sL8SSjomWsSPu3pJU89cfpfBdmGraVTRjuxgBZhtdOT6', '', NULL, NULL, NULL, NULL, NULL, NULL),
(16, '', '', '$2y$10$s/ZlF8GIrgiYKuBgBndT5evOJqvnLKDjXYtLolhKYUFBLzDiNLWD2', '', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'vi', 'morita.vianey@gmail.com', '$2y$10$5NAhyc3.1a./aqLORXpi..ddD67UECG8CmT3hs1PffNNomKcJOCj2', '', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'vi', 'morita.vianey@gmail.com', '$2y$10$L1sgGtVAyD9C3ybJ6H6gV.3yYvSWAoBZ.Ftpcmw6xviCTLI5I39HC', '', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Brenda Vianey', 'vianey@gmail.com', '$2y$10$MAv.8NaRsXvQeoD9xAXQwuGDbUPw6patC6.61iRjVxfWRN9Vx9Af6', '', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
