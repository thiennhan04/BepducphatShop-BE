-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: bepducphatshop
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `images` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `product_id` (`product_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (39,NULL,1,'Nhân','0977631265','sản phẩm tốt',5,'[]','2025-05-24 17:46:02');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'admin','admin@gmail.com','$2b$10$mxjBMKhygacWockPUZZcwOMNpvJbhhh3X0Zfi/yVHQtgUtzUCzar2',NULL,NULL,'user','active','2025-04-13 09:05:47'),(2,'nhannt','nhannt99@gmmail.com','$2b$10$6ie1u6gj9hL4zjC7WETaGeqT/iiP9Fye5CnjZh7FyrEUHh5AGLfmS',NULL,NULL,'user','active','2025-05-01 05:22:01');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (15,16,1,10,990000.00),(16,17,2,10,1000000.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `city` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ward` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `note` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('cart','pending','shipped','delivered','cancelled') DEFAULT 'cart',
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (16,NULL,'0864123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Thành phố Đà Nẵng','Quận Liên Chiểu','Phường Hòa Khánh Bắc','test',9900000.00,'2025-06-14 11:47:31','shipped'),(17,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(18,NULL,'0864123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Thành phố Đà Nẵng','Quận Liên Chiểu','Phường Hòa Khánh Bắc','test',9900000.00,'2025-06-14 11:47:31','delivered'),(19,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','cancelled'),(20,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(21,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(22,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(23,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(24,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(25,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(26,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(27,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(28,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(29,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(30,NULL,'0864123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Thành phố Đà Nẵng','Quận Liên Chiểu','Phường Hòa Khánh Bắc','test',9900000.00,'2025-06-14 11:47:31','pending'),(31,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(32,NULL,'0864123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Thành phố Đà Nẵng','Quận Liên Chiểu','Phường Hòa Khánh Bắc','test',9900000.00,'2025-06-14 11:47:31','pending'),(33,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(34,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(35,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(36,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(37,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(38,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(39,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(40,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(41,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(42,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending'),(43,NULL,'0764123123','nhannt99@gmail.com','Nguyen Thien Nhan','144 Nguyễn Lương Bằng','Tỉnh Hà Giang','Huyện Yên Minh','Xã Sủng Tráng','asdasd',10000000.00,'2025-06-14 11:47:54','pending');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'bep-tu-don-sunhouse-shd6803-1.jpg'),(2,1,'bep-tu-don-sunhouse-shd6803-2.jpg'),(3,1,'bep-tu-don-sunhouse-shd6803-3.jpg'),(4,1,'bep-tu-don-sunhouse-shd6803-4.jpg'),(6,1,'bep-tu-don-sunhouse-shd6803-6.jpg'),(7,1,'bep-tu-don-sunhouse-shd6803-7.jpg'),(8,1,'bep-tu-don-sunhouse-shd6803-8.jpg'),(9,2,'bep-dien-tu-coex-ci-3304-g.jpg'),(10,2,'bep-dien-tu-coex-ci-3304-1.jpg'),(11,2,'bep-dien-tu-coex-ci-3304-2.jpg'),(12,3,'may-xay-nau-da-nang-mini-dingo-dcb600.jpg'),(13,3,'may-xay-nau-da-nang-mini-dingo-dcb600-2.jpg'),(14,4,'may-xay-nau-da-nang-mini-dingo-dcb600-3.jpg'),(15,5,'may-xay-nau-da-nang-mini-dingo-dcb600-3.jpg');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_spec`
--

DROP TABLE IF EXISTS `product_spec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_spec` (
  `spec_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `spec_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `spec_value` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`spec_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_spec_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_spec`
--

LOCK TABLES `product_spec` WRITE;
/*!40000 ALTER TABLE `product_spec` DISABLE KEYS */;
INSERT INTO `product_spec` VALUES (1,1,'thông số kỹ thuật','{\"kiểu bếp\":\"bếp từ đơn\",\"chất liệu mặt bếp\":\"kính Schott Ceran\",\"số vùng nấu\":1}'),(2,1,'công suất & nguồn điện','{\"công suất\":\"1.800W\", \"nguồn điện áp\":\"220V - 240V / 50Hz\"}');
/*!40000 ALTER TABLE `product_spec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `price` decimal(10,2) NOT NULL,
  `promotion` int NOT NULL DEFAULT '0',
  `quantity` int DEFAULT '0',
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sort` int DEFAULT NULL,
  `originalPrice` decimal(10,2) DEFAULT '0.00',
  `image_url` text,
  `brand` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bếp từ đơn Sunhouse SHD6801','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,1000000.00,'spkm1.png','Kaff'),(2,'Bếp từ đơn Sunhouse SHD6802','Bếp từ đơn Sunhouse SHD6803',1000000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png','Kaff'),(3,'Bếp từ đơn Sunhouse SHD6803','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png','Kaff'),(4,'Bếp từ đơn Sunhouse SHD6804','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png','GRANDX'),(5,'Bếp từ đơn Sunhouse SHD6805','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png','Kaff'),(6,'Bếp từ đơn Sunhouse SHD6806','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png','Kaff'),(7,'Bếp gas  Sunhouse SHD6801','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','Kaff'),(8,'Bếp gas Sunhouse SHD6802','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','GRANDX'),(9,'Bếp gas Sunhouse SHD6803','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','GRANDX'),(10,'Bếp gas Sunhouse SHD6804','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','GRANDX'),(11,'Bếp gas Sunhouse SHD6805','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','GRANDX'),(12,'Bếp gas Sunhouse SHD6806','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png','GRANDX'),(13,'Máy hút mùi Sunhouse SHD6801','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX'),(14,'Máy hút mùi Sunhouse SHD6802','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX'),(15,'Máy hút mùiSunhouse SHD6803','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX'),(16,'Máy hút mùi Sunhouse SHD6804','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Lò nướng - Lò vi sóng',1,0.00,'spkm1.png','GRANDX'),(17,'Máy hút mùi Sunhouse SHD6805','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Lò nướng - Lò vi sóng',1,0.00,'spkm1.png','GRANDX'),(18,'Máy hút mùi Sunhouse SHD6806','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Lò nướng - Lò vi sóng',1,0.00,'spkm1.png','GRANDX'),(19,'Máy hút mùi Sunhouse SHD6807','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy rửa chén',1,0.00,'spkm1.png','GRANDX'),(20,'Máy hút mùi Sunhouse SHD6808','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy rửa chén',1,0.00,'spkm1.png','GRANDX'),(21,'Máy hút mùi Sunhouse SHD6809','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy rửa chén',1,0.00,'spkm1.png','GRANDX'),(22,'Máy hút mùi Sunhouse SHD6810','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Chậu rửa - Vòi Rửa',1,0.00,'spkm1.png','GRANDX'),(23,'Máy hút mùi Sunhouse SHD6811','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Chậu rửa - Vòi Rửa',1,0.00,'spkm1.png','GRANDX'),(24,'Máy hút mùi Sunhouse SHD6812','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Chậu rửa - Vòi Rửa',1,0.00,'spkm1.png','GRANDX'),(25,'Máy hút mùi Sunhouse SHD6813','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX'),(26,'Máy hút mùi Sunhouse SHD6814','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX'),(27,'Máy hút mùi Sunhouse SHD6815','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png','GRANDX');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topcategory`
--

DROP TABLE IF EXISTS `topcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sort` int DEFAULT '1',
  `img` varchar(45) DEFAULT NULL,
  `logo1` varchar(45) DEFAULT NULL,
  `logo2` varchar(45) DEFAULT NULL,
  `logo3` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topcategory`
--

LOCK TABLES `topcategory` WRITE;
/*!40000 ALTER TABLE `topcategory` DISABLE KEYS */;
INSERT INTO `topcategory` VALUES (1,'Bếp điện từ',1,'spkm1.png','logokaff1.png','eurosun-logo.png','Chefs.png'),(2,'Bếp gas',2,'spkm1.png','logokaff1.png','eurosun-logo.png','Chefs.png'),(3,'Máy hút mùi',3,'spkm1.png','eurosun-logo.png','logokaff1.png','bosch.jpg'),(4,'Lò nướng - Lò vi sóng',4,'spkm1.png','bosch.jpg','logokaff1.png','eurosun-logo.png'),(5,'Máy rửa chén',5,'spkm1.png','bosch.jpg','logokaff1.png','eurosun-logo.png'),(6,'Chậu rửa - Vòi Rửa',6,'spkm1.png','logokaff1.png','eurogold.png','Carysil.png');
/*!40000 ALTER TABLE `topcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bepducphatshop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 20:39:00
