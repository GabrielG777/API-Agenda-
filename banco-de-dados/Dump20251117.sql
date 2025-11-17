CREATE DATABASE  IF NOT EXISTS `agendaplus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `agendaplus`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: agendaplus
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `id_prestador` int NOT NULL,
  `id_cliente` int NOT NULL,
  `descricao` text,
  `valor` decimal(10,2) DEFAULT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fim` datetime NOT NULL,
  `status` varchar(20) DEFAULT 'pendente',
  `data_cadastro` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_prestador` (`id_prestador`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `agendamento_ibfk_31` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `agendamento_ibfk_32` FOREIGN KEY (`id_prestador`) REFERENCES `prestador` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `agendamento_ibfk_33` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (6,1,1,3,'Agendamento de Corte Feminino (Serviço ID 1)',90.00,'2025-11-20 13:00:00','2025-11-20 14:00:00','pendente','2025-11-15 00:44:05'),(7,1,1,3,'Agendamento das 11h',90.00,'2025-11-20 14:00:00','2025-11-20 15:00:00','pendente','2025-11-15 00:48:33');
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` text,
  `slug` varchar(50) NOT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `cnpj_2` (`cnpj`),
  UNIQUE KEY `slug_2` (`slug`),
  UNIQUE KEY `slug_3` (`slug`),
  UNIQUE KEY `cnpj_3` (`cnpj`),
  UNIQUE KEY `slug_4` (`slug`),
  UNIQUE KEY `cnpj_4` (`cnpj`),
  UNIQUE KEY `cnpj_5` (`cnpj`),
  UNIQUE KEY `slug_5` (`slug`),
  UNIQUE KEY `slug_6` (`slug`),
  UNIQUE KEY `cnpj_6` (`cnpj`),
  UNIQUE KEY `slug_7` (`slug`),
  UNIQUE KEY `cnpj_7` (`cnpj`),
  UNIQUE KEY `slug_8` (`slug`),
  UNIQUE KEY `cnpj_8` (`cnpj`),
  UNIQUE KEY `slug_9` (`slug`),
  UNIQUE KEY `cnpj_9` (`cnpj`),
  UNIQUE KEY `slug_10` (`slug`),
  UNIQUE KEY `cnpj_10` (`cnpj`),
  UNIQUE KEY `slug_11` (`slug`),
  UNIQUE KEY `cnpj_11` (`cnpj`),
  UNIQUE KEY `slug_12` (`slug`),
  UNIQUE KEY `cnpj_12` (`cnpj`),
  UNIQUE KEY `slug_13` (`slug`),
  UNIQUE KEY `cnpj_13` (`cnpj`),
  UNIQUE KEY `slug_14` (`slug`),
  UNIQUE KEY `cnpj_14` (`cnpj`),
  UNIQUE KEY `slug_15` (`slug`),
  UNIQUE KEY `cnpj_15` (`cnpj`),
  UNIQUE KEY `slug_16` (`slug`),
  UNIQUE KEY `cnpj_16` (`cnpj`),
  UNIQUE KEY `slug_17` (`slug`),
  UNIQUE KEY `cnpj_17` (`cnpj`),
  UNIQUE KEY `slug_18` (`slug`),
  UNIQUE KEY `cnpj_18` (`cnpj`),
  UNIQUE KEY `slug_19` (`slug`),
  UNIQUE KEY `cnpj_19` (`cnpj`),
  UNIQUE KEY `slug_20` (`slug`),
  UNIQUE KEY `cnpj_20` (`cnpj`),
  UNIQUE KEY `slug_21` (`slug`),
  UNIQUE KEY `cnpj_21` (`cnpj`),
  UNIQUE KEY `slug_22` (`slug`),
  UNIQUE KEY `cnpj_22` (`cnpj`),
  UNIQUE KEY `slug_23` (`slug`),
  UNIQUE KEY `cnpj_23` (`cnpj`),
  UNIQUE KEY `slug_24` (`slug`),
  UNIQUE KEY `cnpj_24` (`cnpj`),
  UNIQUE KEY `slug_25` (`slug`),
  UNIQUE KEY `cnpj_25` (`cnpj`),
  UNIQUE KEY `slug_26` (`slug`),
  UNIQUE KEY `cnpj_26` (`cnpj`),
  UNIQUE KEY `slug_27` (`slug`),
  UNIQUE KEY `cnpj_27` (`cnpj`),
  UNIQUE KEY `slug_28` (`slug`),
  UNIQUE KEY `cnpj_28` (`cnpj`),
  UNIQUE KEY `slug_29` (`slug`),
  UNIQUE KEY `cnpj_29` (`cnpj`),
  UNIQUE KEY `slug_30` (`slug`),
  UNIQUE KEY `cnpj_30` (`cnpj`),
  UNIQUE KEY `slug_31` (`slug`),
  UNIQUE KEY `cnpj_31` (`cnpj`),
  UNIQUE KEY `slug_32` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Barbearia do Gabriel','12.345.678/0001-99','14997858866','contato@barbearia.com','Rua Exemplo, 123','barbearia-do-gabriel','2025-09-17 23:33:48'),(2,'Studio Beleza Pura','11111111000199','11911112222','contato@beleza.com','Rua das Flores, 10','beleza-pura','2025-11-15 00:06:41');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extrato`
--

DROP TABLE IF EXISTS `extrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extrato` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `reg_ans` varchar(20) DEFAULT NULL,
  `cd_conta_contabil` varchar(50) DEFAULT NULL,
  `descricao` text,
  `vl_saldo_inicial` decimal(15,2) DEFAULT NULL,
  `vl_saldo_final` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extrato`
--

LOCK TABLES `extrato` WRITE;
/*!40000 ALTER TABLE `extrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `extrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movto`
--

DROP TABLE IF EXISTS `movto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `id_cliente` int NOT NULL,
  `data_movto` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(20) DEFAULT 'venda',
  `observacao` text,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `movto_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`),
  CONSTRAINT `movto_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movto`
--

LOCK TABLES `movto` WRITE;
/*!40000 ALTER TABLE `movto` DISABLE KEYS */;
/*!40000 ALTER TABLE `movto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movto_itens`
--

DROP TABLE IF EXISTS `movto_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movto_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_movto` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_movto` (`id_movto`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `movto_itens_ibfk_1` FOREIGN KEY (`id_movto`) REFERENCES `movto` (`id`),
  CONSTRAINT `movto_itens_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movto_itens`
--

LOCK TABLES `movto_itens` WRITE;
/*!40000 ALTER TABLE `movto_itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `movto_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestador`
--

DROP TABLE IF EXISTS `prestador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_servico` int NOT NULL,
  `descricao` text,
  `duracao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prestador_id_usuario_id_servico` (`id_usuario`,`id_servico`),
  KEY `id_servico` (`id_servico`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `prestador_ibfk_73` FOREIGN KEY (`id_servico`) REFERENCES `servicos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `prestador_ibfk_74` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `prestador_ibfk_75` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestador`
--

LOCK TABLES `prestador` WRITE;
/*!40000 ALTER TABLE `prestador` DISABLE KEYS */;
INSERT INTO `prestador` VALUES (1,1,2,1,'Especialista em cortes longos.',NULL);
/*!40000 ALTER TABLE `prestador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int DEFAULT '0',
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `duracao` int NOT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `servicos_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (1,1,'Corte Feminino','Corte, lavagem e secagem.',90.00,60,'2025-11-15 00:11:53'),(2,1,'Manicure e Pedicure','Cutilagem e esmaltação.',55.00,90,'2025-11-15 00:12:13');
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `flg_ativo` char(1) DEFAULT 'S',
  `flg_tipo` char(1) NOT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,2,'Ana Admin','$2b$10$Dg1dSZQd5HKco9cKhbCP2OoKcLxkaQtPYOZL4TV3sA2RaW35zmf/u','11933334444','ana.admin@beleza.com','S','A','2025-11-15 00:10:13'),(2,1,'Bruno Cabeleireiro','$2b$10$XRniN5w88iPwPce/Gd162eUOr9N9480nHJoRKXFdcx3CFzG4bp4Qy','11955556666','bruno.c@beleza.com','S','P','2025-11-15 00:10:48'),(3,1,'Carla Cliente','$2b$10$kJEEMhRL83wWQdEuMdhIPuXbgSKNoTsXR8NzRj4O.0yo4p87U8Z2W','11977778888','carla.cliente@email.com','S','C','2025-11-15 00:11:03');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 20:40:25
