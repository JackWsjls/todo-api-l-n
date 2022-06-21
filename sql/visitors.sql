/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50735
Source Host           : localhost:3306
Source Database       : todo_development

Target Server Type    : MYSQL
Target Server Version : 50735
File Encoding         : 65001

Date: 2022-06-21 10:04:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `point` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
