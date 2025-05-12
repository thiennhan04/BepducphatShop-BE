-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: bepducphatshop
-- ------------------------------------------------------
-- Server version	8.0.30

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,NULL,1,'Nguyen Thien Nhan','0123456789','Mình cần tư vấn bếp từ',1,'[]','2025-04-28 15:23:57'),(2,1,1,'Tét','0123456790','Mình thấy mua ở đây ổn đó',NULL,'[]','2025-04-28 15:46:14'),(3,1,1,'TEST 1','0764682028','Cần tư vấn bếp từ',NULL,'[]','2025-05-01 04:57:54'),(34,1,1,'TEST 1','0764683208','Cần tư vấn bếp từ',NULL,'[{\"url\":\"http://localhost:5000/api/v1/static/image/r3aagq9dtuswg1aqvkwfcpblj.jpg\",\"type\":\"image\"},{\"url\":\"http://localhost:5000/api/v1/static/image/rhm15fu23bft5qss6zrh7berf.jpg\",\"type\":\"image\"}]','2025-05-05 12:00:33'),(35,1,1,'TEST 1','0764658208','Cần tư vấn bếp từ',NULL,'[{\"url\":\"http://localhost:5000/api/v1/static/image/r3aagq9dtuswg1aqvkwfcpblj.jpg\",\"type\":\"image\"},{\"url\":\"http://localhost:5000/api/v1/static/image/rhm15fu23bft5qss6zrh7berf.jpg\",\"type\":\"image\"}]','2025-05-05 12:01:13'),(36,1,1,'TEST 1','0764682408','Cần tư vấn bếp từ',NULL,'[{\"url\":\"http://localhost:5000/api/v1/static/image/r3aagq9dtuswg1aqvkwfcpblj.jpg\",\"type\":\"image\"},{\"url\":\"http://localhost:5000/api/v1/static/image/rhm15fu23bft5qss6zrh7berf.jpg\",\"type\":\"image\"}]','2025-05-05 12:01:15'),(37,NULL,1,'Hello','0764668208','Cần tư vấn bếp từ',4,'[{\"url\":\"http://localhost:5000/api/v1/static/image/r3aagq9dtuswg1aqvkwfcpblj.jpg\",\"type\":\"image\"},{\"url\":\"http://localhost:5000/api/v1/static/image/rhm15fu23bft5qss6zrh7berf.jpg\",\"type\":\"image\"}]','2025-05-06 16:28:51'),(38,NULL,1,'Hello','0765468208','Cần tư vấn',4,'[{\"url\":\"http://localhost:5000/api/v1/static/image/r3aagq9dtuswg1aqvkwfcpblj.jpg\",\"type\":\"image\"},{\"url\":\"http://localhost:5000/api/v1/static/image/rhm15fu23bft5qss6zrh7berf.jpg\",\"type\":\"image\"}]','2025-05-06 16:29:07');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,0.00),(2,1,2,2,0.00),(4,2,2,2,0.00),(5,6,1,1,0.00),(6,7,1,1,0.00),(7,8,1,1,0.00),(8,9,1,1,0.00),(9,10,1,1,0.00),(10,11,1,1,0.00),(11,12,1,2,0.00),(12,13,1,2,990000.00),(13,14,1,2,990000.00),(14,15,1,2,990000.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,'2025-05-08 17:07:58','cart'),(2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.00,'2025-05-08 17:07:58','cart'),(6,NULL,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,0.00,'2025-05-09 18:05:23','pending'),(7,NULL,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,0.00,'2025-05-09 18:07:36','pending'),(8,NULL,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,0.00,'2025-05-09 18:08:02','pending'),(9,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,0.00,'2025-05-09 18:09:02','pending'),(10,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,0.00,'2025-05-09 18:14:56','pending'),(11,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,990000.00,'2025-05-09 18:15:31','pending'),(12,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,1980000.00,'2025-05-09 18:15:40','pending'),(13,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,1980000.00,'2025-05-09 18:21:53','pending'),(14,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,1980000.00,'2025-05-09 18:23:01','pending'),(15,1,'0763456789','admin@gmail.com','Nguyễn Thiện Nhân','137 Nguyễn Văn Linh','Đà Nẵng','Hòa Khánh Bắc','Liên Chiểu',NULL,1980000.00,'2025-05-09 18:23:13','pending');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'https://st.meta.vn/Data/image/2021/12/19/bep-tu-don-sunhouse-shd6803-1.jpg'),(2,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-2.jpg'),(3,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-3.jpg'),(4,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-4.jpg'),(6,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-6.jpg'),(7,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-7.jpg'),(8,1,'https://st.meta.vn/Data/Image/2021/12/19/bep-tu-don-sunhouse-shd6803-8.jpg'),(9,2,'https://st.meta.vn/Data/image/2024/02/24/bep-dien-tu-coex-ci-3304-g.jpg'),(10,2,'https://st.meta.vn/Data/Image/2024/02/24/bep-dien-tu-coex-ci-3304-1.jpg'),(11,2,'https://st.meta.vn/Data/Image/2024/02/24/bep-dien-tu-coex-ci-3304-2.jpg'),(12,3,'https://st.meta.vn/Data/image/2022/12/05/may-xay-nau-da-nang-mini-dingo-dcb600.jpg'),(13,3,'https://st.meta.vn/Data/Image/2022/12/05/may-xay-nau-da-nang-mini-dingo-dcb600-2.jpg'),(14,4,'https://st.meta.vn/Data/Image/2022/12/05/may-xay-nau-da-nang-mini-dingo-dcb600-3.jpg');
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
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bếp từ đơn Sunhouse SHD6801','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(2,'Bếp từ đơn Sunhouse SHD6802','Bếp từ đơn Sunhouse SHD6803',1000000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(3,'Bếp từ đơn Sunhouse SHD6803','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(4,'Bếp từ đơn Sunhouse SHD6804','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(5,'Bếp từ đơn Sunhouse SHD6805','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(6,'Bếp từ đơn Sunhouse SHD6806','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp điện từ',1,0.00,'spkm1.png'),(7,'Bếp gas  Sunhouse SHD6801','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(8,'Bếp gas Sunhouse SHD6802','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(9,'Bếp gas Sunhouse SHD6803','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(10,'Bếp gas Sunhouse SHD6804','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(11,'Bếp gas Sunhouse SHD6805','Bếp gas Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(12,'Bếp gas Sunhouse SHD6806','Bếp từ đơn Sunhouse SHD6803',990000.00,10,10,'Bếp gas',1,0.00,'spkm1.png'),(13,'Máy hút mùi Sunhouse SHD6801','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png'),(14,'Máy hút mùi Sunhouse SHD6802','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png'),(15,'Máy hút mùiSunhouse SHD6803','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png'),(16,'Máy hút mùi Sunhouse SHD6804','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png'),(17,'Máy hút mùi Sunhouse SHD6805','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png'),(18,'Máy hút mùi Sunhouse SHD6806','Máy hút mùi Sunhouse SHD6801',990000.00,10,10,'Máy hút mùi',1,0.00,'spkm1.png');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topcategory`
--

LOCK TABLES `topcategory` WRITE;
/*!40000 ALTER TABLE `topcategory` DISABLE KEYS */;
INSERT INTO `topcategory` VALUES (1,'Bếp điện từ',1),(2,'Bếp gas',2),(3,'Máy hút mùi',3),(4,'Lò nướng - Lò vi sóng',4),(5,'Máy rửa chén',5),(6,'Chậu rửa - Vòi Rửa',6);
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

-- Dump completed on 2025-05-13  0:26:18
