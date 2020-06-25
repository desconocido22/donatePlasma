DROP DATABASE IF EXISTS `donate`;
CREATE DATABASE `donate`;
USE `donate`;

CREATE TABLE `blood_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
INSERT INTO `blood_type` VALUES (1,'O-'),(2,'O+'),(3,'A-'),(4,'A+'),(5,'B-'),(6,'B+'),(7,'AB-'),(8,'AB+');

CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `city` VALUES (1,'Cochabamba'),(2,'La Paz'),(3,'Santa Cruz'),(4,'Oruro'),(5,'Potosi'),(6,'Tarija'),(7,'Chuquisaca'),(8,'Beni'),(9,'Pando');

CREATE TABLE `compatibility` (
  `recipient_blood_type_id` int NOT NULL,
  `donor_blood_type_id` int NOT NULL,
  PRIMARY KEY (`recipient_blood_type_id`,`donor_blood_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `compatibility` VALUES (1,1),(2,1),(2,2),(3,1),(3,3),(4,1),(4,2),(4,3),(4,4),(5,1),(5,5),(6,1),(6,2),(6,5),(6,6),(7,1),(7,3),(7,5),(7,7),(8,1),(8,2),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8);

CREATE TABLE `donor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blood_type_id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `cell` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `anonymous` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blood_type_id` (`blood_type_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `donor_blood_type` FOREIGN KEY (`blood_type_id`) REFERENCES `blood_type` (`id`),
  CONSTRAINT `donor_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `donor_recipient` (
  `donor_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`donor_id`,`recipient_id`),
  KEY `recipient_idx` (`recipient_id`),
  CONSTRAINT `donor` FOREIGN KEY (`donor_id`) REFERENCES `donor` (`id`),
  CONSTRAINT `recipient` FOREIGN KEY (`recipient_id`) REFERENCES `recipient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;