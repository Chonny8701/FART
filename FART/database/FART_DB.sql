-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_f-art
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_fart_cesta`
--

DROP TABLE IF EXISTS `tb_fart_cesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fart_cesta` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(128) NOT NULL,
  `descripcion` varchar(512) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int NOT NULL,
  `url_imagen` varchar(256) NOT NULL,
  `id_usuario` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_id_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `tb_fart_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fart_cesta`
--

LOCK TABLES `tb_fart_cesta` WRITE;
/*!40000 ALTER TABLE `tb_fart_cesta` DISABLE KEYS */;
INSERT INTO `tb_fart_cesta` VALUES ('490a52d4-4ec9-440e-a131-a2ac9a960c9f','Producto 2','Descripcion Producto 2',25,2,'8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173422.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('69346a42-bd05-4fa4-a2df-13218774831b','Calabazas para Halloween','\r\n\"Adorno de calabazas para Halloween: Dale un toque festivo y espeluznante a tu decoración con estas calabazas decorativas.\"',6.8,3,'8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173356.webp','60fb0107-646b-4bc2-aa68-9c4c24911ea3'),('f92c0b85-78f9-49e0-b977-924a757b14ce','Producto 3','Descripcion Producto 3',12.35,2,'8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173356.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e');
/*!40000 ALTER TABLE `tb_fart_cesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_fart_eventos`
--

DROP TABLE IF EXISTS `tb_fart_eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fart_eventos` (
  `id` varchar(36) NOT NULL,
  `titulo` varchar(127) NOT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `organizador` varchar(36) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `url_imagen` varchar(60) DEFAULT NULL,
  `telefono` varchar(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_idx` (`organizador`),
  CONSTRAINT `fk_evento_usuario` FOREIGN KEY (`organizador`) REFERENCES `tb_fart_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fart_eventos`
--

LOCK TABLES `tb_fart_eventos` WRITE;
/*!40000 ALTER TABLE `tb_fart_eventos` DISABLE KEYS */;
INSERT INTO `tb_fart_eventos` VALUES ('373cb83a-f08b-4409-8ee6-e00506186e78','Taller de pintura','\"Sumérgete en el apasionante mundo de la pintura y despierta tu creatividad en nuestro taller de pintura de retratos. Aprende las técnicas fundamentales para capturar la esencia y la expresión de tus sujetos en lienzos. Nuestro taller te guiará a través de las habilidades artísticas necesarias para crear retratos impresionantes y emocionantes. No importa si eres un principiante o un artista experimentado, ¡todos son bienvenidos a explorar el arte de la pintura de retratos con nosotros!\"','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e','Francesc Macia 131, 3-1, Granollers','2023-10-26','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231026142221.webp','+34 91 234 56 78','tallerdepintura@gmail.com'),('5b0c59af-0b8b-4c53-8009-7e9d163c15c9','Exposición de pintura','\"Descubre el asombroso mundo de la acuarela en nuestra exposición de pintura \'Acuarelas en Armonía\'. Esta exhibición te llevará a un viaje a través de la belleza de la técnica de la acuarela, donde los artistas han explorado la transparencia y la fluidez de este medio para crear obras maestras visuales. Desde paisajes evocadores hasta retratos conmovedores, cada pieza te sumergirá en un mundo de colores y emociones capturados en papel. Únete a nosotros y contempla cómo la acuarela se convierte en una expresión artística única y cautivadora en esta emocionante exposición.\"','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e','Calle de la Rosa, 123 08001 Barcelona','2023-11-25','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231026142330.webp','+34 93 456 78 90','exposicionpintura@gmail.com'),('f7760d32-e9eb-4a75-be37-6254a8cc1e94','Taller de pintura','\"Explora tu creatividad y desarrolla tus habilidades artísticas en nuestro emocionante taller de pintura. Nuestro taller te ofrece la oportunidad de sumergirte en el mundo de la pintura, donde aprenderás diversas técnicas, desde el uso de colores y pinceles hasta la creación de composiciones únicas. Tanto si eres un principiante como un artista experimentado, nuestro taller es el lugar perfecto para expresarte a través del arte. Únete a nosotros y descubre la alegría de pintar mientras creas tus propias obras maestras.\"','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e','Avenida Diagonal, 123 08028 Barcelona España','2023-11-30','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231026143353.webp','+34 91 234 56 78','info@tallerdepintura.com'),('f859eb1f-f6cd-4d4a-909f-c6c419fc0afd','Taller de pintura para niños','\"¡Bienvenidos al mágico mundo de la creatividad! Nuestro taller de pintura para niños es un lugar donde los pequeños artistas pueden dar rienda suelta a su imaginación. A través de juegos y actividades divertidas, explorarán una variedad de técnicas artísticas y colores. Los niños aprenderán a pintar sus propias obras maestras mientras se divierten y expresan su creatividad. ¡Un lugar perfecto para que los jóvenes talentos florezcan y se conviertan en artistas en ciernes!\"','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e','Calle de la Inspiración, 456 08012 Barcelona España','2023-12-16','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231026143811.webp','+34 91 234 56 78','info@tallerpinturaniños.com');
/*!40000 ALTER TABLE `tb_fart_eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_fart_participantes_evento`
--

DROP TABLE IF EXISTS `tb_fart_participantes_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fart_participantes_evento` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(64) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `id_evento` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_evento_idx` (`id_evento`),
  CONSTRAINT `fk_evento` FOREIGN KEY (`id_evento`) REFERENCES `tb_fart_eventos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fart_participantes_evento`
--

LOCK TABLES `tb_fart_participantes_evento` WRITE;
/*!40000 ALTER TABLE `tb_fart_participantes_evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_fart_participantes_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_fart_productos`
--

DROP TABLE IF EXISTS `tb_fart_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fart_productos` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(128) NOT NULL,
  `descripcion` varchar(512) NOT NULL,
  `precio` float NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `url_imagen` varchar(256) NOT NULL,
  `codigo_usuario` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_usuario_idx` (`codigo_usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`codigo_usuario`) REFERENCES `tb_fart_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fart_productos`
--

LOCK TABLES `tb_fart_productos` WRITE;
/*!40000 ALTER TABLE `tb_fart_productos` DISABLE KEYS */;
INSERT INTO `tb_fart_productos` VALUES ('1101dc04-3921-4f56-9bbb-c7d6c37704bc','Calabazas para Halloween','\r\n\"Adorno de calabazas para Halloween: Dale un toque festivo y espeluznante a tu decoración con estas calabazas decorativas.\"',6.8,'Adornos Hogar','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173356.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('276f32aa-c0e9-4121-aef7-58b887001d02','Pulseras con nombres','\r\n\"Pulseras con nombres: El toque personal que llevas contigo, un accesorio único que refleja tu identidad.\"',4.5,'Manualidades','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027152131.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('3b5b1798-ce41-4405-8392-02cabc7d2486','Retrato','Retrato de mujer con colores vibrantes',10.15,'Pinturas','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027153601.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('4b3087e4-c16b-4ca5-9b78-62742cf226a3','Colgante de piedras semi-preciosas','Colgante de piedra Ágata Morada, diseño impresionante : Colgante de diseño con forma de punta en Ágata Morada y un cadena de hilo encerado negro de 45cm. Las dimensiones del colgante son 40 x 8 mm. Como se trata de un colgante de piedra natural estas medidas pueden variar un poco.',5.2,'Manualidades','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027154811.jpg','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('568aa20e-9832-479a-be5e-998e206876c4','Pulseras Personalizadas','\"Pulseras de colores con nombres: Accesorios vibrantes y personalizados para expresar tu estilo y personalidad.\"',4.5,'Manualidades','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027151959.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('66bac350-d60f-4e39-b285-53f5bde61b9e','Adorno de pared','\"Adorno de pared con forma de cactus: Agrega un toque de naturaleza y estilo desértico a tu decoración.\"',16.4,'Adornos Hogar','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173409.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('8149145d-7426-43f0-92da-303ed0607417','Pintura de paisaje','Pintura de paisaje Vilanova del valles. Cuadro impresionista del pintor Ernest Descals',36.2,'Pinturas','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027153945.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('92f5cdaf-1ae2-4dbd-81c6-27f0f8bee368','Adorno de pared','\r\n\"Adorno de pared en forma de guitarra: Decora tu espacio con pasión musical y estilo.\"',13.25,'Adornos Hogar','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173212.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('a3248718-1b57-4de1-ab35-4096b0e5986b','Pintura de paisaje','Pintura en oleo sobre lienzo para decoración del hogar',10.2,'Pinturas','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027154133.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('aa337e3d-7688-4225-b347-bcd3311d3746','Pulsera de bolas','Esta pulsera artesanal es una elegante combinación de estilo y naturalidad. Está cuidadosamente diseñada con una sucesión de cuentas negras y cuentas de madera, que se entrelazan de manera armoniosa para crear una pieza única. Las cuentas negras aportan un toque de sofisticación y misterio, mientras que las cuentas de madera añaden un elemento cálido y terroso a la pulsera.',3.5,'Manualidades','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231025181927.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('c344b18d-bffc-4dcf-9a0b-69f5ef402279','Cuadro clásico','Cuadro clásico enmarcado. Impresión en papel fotográfico de alta calidad',20.3,'Pinturas','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027153306.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('de0d2af9-617e-4f4a-a130-6b61744ef88f','Colgador figuras Halloween','\r\n\"Colgador de figuras de Halloween: Decora tu hogar con estos espeluznantes personajes suspendidos que capturan la esencia de la diversión y el misterio de Halloween.\"',6.2,'Adornos Hogar','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027173422.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e'),('fc24c619-da5e-44d6-8a0c-914aebfc87ca','Pintura realista','Pintura realista de rostro femenino',23.2,'Pinturas','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e_20231027172921.webp','8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e');
/*!40000 ALTER TABLE `tb_fart_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_fart_usuarios`
--

DROP TABLE IF EXISTS `tb_fart_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fart_usuarios` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(80) NOT NULL,
  `cuenta_bancaria` varchar(34) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fart_usuarios`
--

LOCK TABLES `tb_fart_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_fart_usuarios` DISABLE KEYS */;
INSERT INTO `tb_fart_usuarios` VALUES ('60fb0107-646b-4bc2-aa68-9c4c24911ea3','asd','123','asd@gmail.com','$2b$12$RT.gb9oHGlYThibvQ/h13.0nDSeS810YD5BuD3GeAezPLyIvYlVai',''),('8691dd62-a1ca-41e1-a2b1-14f84cd2fe2e','José Daniel Garcia Perez','123','123@yahoo.es','$2b$12$4MpU2En6gwgSKpNTtMLUyuQgNOPlKdbQDYGgj5Btsu/7NRPkKl.sS','123');
/*!40000 ALTER TABLE `tb_fart_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 16:54:38
