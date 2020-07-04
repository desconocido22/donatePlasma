-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: donate
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blood_type`
--

DROP TABLE IF EXISTS `blood_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_type`
--

LOCK TABLES `blood_type` WRITE;
/*!40000 ALTER TABLE `blood_type` DISABLE KEYS */;
INSERT INTO `blood_type` VALUES (1,'O-'),(2,'O+'),(3,'A-'),(4,'A+'),(5,'B-'),(6,'B+'),(7,'AB-'),(8,'AB+');
/*!40000 ALTER TABLE `blood_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Cochabamba'),(2,'La Paz'),(3,'Santa Cruz'),(4,'Oruro'),(5,'Potosi'),(6,'Tarija'),(7,'Chuquisaca'),(8,'Beni'),(9,'Pando');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compatibility`
--

DROP TABLE IF EXISTS `compatibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compatibility` (
  `recipient_blood_type_id` int NOT NULL,
  `donor_blood_type_id` int NOT NULL,
  PRIMARY KEY (`recipient_blood_type_id`,`donor_blood_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compatibility`
--

LOCK TABLES `compatibility` WRITE;
/*!40000 ALTER TABLE `compatibility` DISABLE KEYS */;
INSERT INTO `compatibility` VALUES (1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,3),(4,4),(5,1),(5,5),(6,1),(6,2),(6,5),(6,6),(7,1),(7,3),(7,5),(7,7),(8,1),(8,2),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8);
/*!40000 ALTER TABLE `compatibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blood_type_id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `cell` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `public` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blood_type_id` (`blood_type_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `donor_blood_type` FOREIGN KEY (`blood_type_id`) REFERENCES `blood_type` (`id`),
  CONSTRAINT `donor_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES (2,4,'Donor 1','22123111','',1,1,1,'2020-06-28 22:45:25','2020-06-28 22:45:25',NULL);
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor_recipient`
--

DROP TABLE IF EXISTS `donor_recipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor_recipient` (
  `donor_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`donor_id`,`recipient_id`),
  KEY `recipient_idx` (`recipient_id`),
  CONSTRAINT `donor` FOREIGN KEY (`donor_id`) REFERENCES `donor` (`id`),
  CONSTRAINT `recipient` FOREIGN KEY (`recipient_id`) REFERENCES `recipient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor_recipient`
--

LOCK TABLES `donor_recipient` WRITE;
/*!40000 ALTER TABLE `donor_recipient` DISABLE KEYS */;
/*!40000 ALTER TABLE `donor_recipient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipient`
--

DROP TABLE IF EXISTS `recipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blood_type_id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `cell_numbers` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `photo_path` varchar(150) NOT NULL,
  `city_id` int NOT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `public` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blood_type_id` (`blood_type_id`),
  KEY `city` (`city_id`),
  CONSTRAINT `recipient_blood_type` FOREIGN KEY (`blood_type_id`) REFERENCES `blood_type` (`id`),
  CONSTRAINT `recipient_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipient`
--

LOCK TABLES `recipient` WRITE;
/*!40000 ALTER TABLE `recipient` DISABLE KEYS */;
INSERT INTO `recipient` VALUES (1,2,'Test 1','71726422','test1@gmail.com','',1,1,1,'2020-06-24 22:48:51','2020-06-24 22:48:51',NULL),(3,4,'Test 2','71726777','test2@gmail.com','none',2,1,1,'2020-06-25 14:53:44','2020-06-25 14:53:44',NULL),(4,4,'Test 3','71711156','test3@gmail.com','',1,1,0,'2020-06-25 15:25:15','2020-06-25 15:25:15',NULL),(5,4,'Test recipient 6','71733336','rec6@gmail.com','',1,1,1,'2020-06-28 23:14:47','2020-06-28 23:14:47',NULL),(6,4,'Test recipient 7','71733336','','',1,0,0,'2020-06-29 00:43:37','2020-06-29 00:43:37',NULL);
/*!40000 ALTER TABLE `recipient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-29  0:48:37