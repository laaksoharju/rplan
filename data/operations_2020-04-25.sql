# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.21)
# Database: operations
# Generation Time: 2020-04-25 14:26:40 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `event_id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `operation_id` int(12) unsigned DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

INSERT INTO `events` (`event_id`, `event_name`, `operation_id`)
VALUES
	(1,'Patient X',1),
	(2,'Patient Y',3),
	(3,'Patient Z',3);

/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table operation_steps
# ------------------------------------------------------------

DROP TABLE IF EXISTS `operation_steps`;

CREATE TABLE `operation_steps` (
  `operation_id` int(12) unsigned NOT NULL,
  `resource_group_id` int(12) unsigned NOT NULL,
  `order` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`operation_id`,`resource_group_id`,`order`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `operation_steps` WRITE;
/*!40000 ALTER TABLE `operation_steps` DISABLE KEYS */;

INSERT INTO `operation_steps` (`operation_id`, `resource_group_id`, `order`)
VALUES
	(1,5,2),
	(1,6,1),
	(2,5,1),
	(2,5,3),
	(2,6,2),
	(3,5,1),
	(3,5,2),
	(3,6,3);

/*!40000 ALTER TABLE `operation_steps` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table operations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `operations`;

CREATE TABLE `operations` (
  `operation_id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `operation_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`operation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;

INSERT INTO `operations` (`operation_id`, `operation_name`)
VALUES
	(1,'Fotledsfraktur'),
	(2,'Lapgalla'),
	(3,'Höftledsfraktur');

/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resource_capabilities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource_capabilities`;

CREATE TABLE `resource_capabilities` (
  `resource_id` int(12) unsigned NOT NULL,
  `operation_id` int(12) unsigned NOT NULL,
  `level` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`resource_id`,`operation_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `resource_capabilities` WRITE;
/*!40000 ALTER TABLE `resource_capabilities` DISABLE KEYS */;

INSERT INTO `resource_capabilities` (`resource_id`, `operation_id`, `level`)
VALUES
	(1,1,255),
	(2,2,255),
	(2,1,127),
	(3,1,255),
	(4,1,255),
	(4,2,200),
	(5,1,183),
	(8,1,255),
	(8,2,100),
	(6,1,255),
	(6,2,127),
	(7,1,50),
	(7,2,200),
	(1,2,127),
	(3,2,127),
	(9,2,127),
	(9,1,255);

/*!40000 ALTER TABLE `resource_capabilities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resource_group_members
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource_group_members`;

CREATE TABLE `resource_group_members` (
  `resource_group_id` int(12) unsigned NOT NULL,
  `resource_id` int(12) unsigned NOT NULL,
  `child_resource_group_id` int(12) unsigned NOT NULL,
  PRIMARY KEY (`resource_group_id`,`resource_id`,`child_resource_group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `resource_group_members` WRITE;
/*!40000 ALTER TABLE `resource_group_members` DISABLE KEYS */;

INSERT INTO `resource_group_members` (`resource_group_id`, `resource_id`, `child_resource_group_id`)
VALUES
	(1,1,0),
	(1,2,0),
	(1,9,0),
	(2,3,0),
	(3,4,0),
	(3,5,0),
	(4,6,0),
	(4,7,0),
	(5,0,3),
	(5,8,0),
	(6,0,1),
	(6,0,2),
	(6,0,4),
	(6,0,7),
	(7,4,0);

/*!40000 ALTER TABLE `resource_group_members` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resource_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource_groups`;

CREATE TABLE `resource_groups` (
  `resource_group_id` int(12) unsigned NOT NULL,
  `resource_group_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`resource_group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `resource_groups` WRITE;
/*!40000 ALTER TABLE `resource_groups` DISABLE KEYS */;

INSERT INTO `resource_groups` (`resource_group_id`, `resource_group_name`)
VALUES
	(1,'Operatörer'),
	(2,'Röntgenapparater'),
	(3,'Sjuksköterskor'),
	(4,'Operationssalar'),
	(5,'Vårdplatser'),
	(6,'Operation'),
	(7,'Operationssjuksköterskor'),
	(8,'Konsultationer'),
	(9,'Labbprover');

/*!40000 ALTER TABLE `resource_groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resources
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resources`;

CREATE TABLE `resources` (
  `resource_id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`resource_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;

INSERT INTO `resources` (`resource_id`, `resource_name`)
VALUES
	(1,'Gunilla Knif'),
	(2,'Bengt Skalpell'),
	(3,'X-ray'),
	(4,'Patrik Våård'),
	(5,'Camilla Nöörs'),
	(6,'Sal 1'),
	(7,'Sal 2'),
	(8,'Säng 1'),
	(9,'Lina Saxén'),
	(10,'Göran Klamp'),
	(11,'Eva-Lena Baddare'),
	(12,'Stefan Lifvén');

/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resources_scheduled
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resources_scheduled`;

CREATE TABLE `resources_scheduled` (
  `resource_id` int(12) unsigned NOT NULL,
  `event_id` int(12) unsigned NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `duration` int(12) unsigned NOT NULL DEFAULT '60',
  PRIMARY KEY (`resource_id`,`start_time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `resources_scheduled` WRITE;
/*!40000 ALTER TABLE `resources_scheduled` DISABLE KEYS */;

INSERT INTO `resources_scheduled` (`resource_id`, `event_id`, `start_time`, `duration`)
VALUES
	(2,0,'2018-08-30 11:15:26',60),
	(2,0,'2018-08-31 12:16:34',120),
	(3,0,'2018-08-30 11:21:49',360);

/*!40000 ALTER TABLE `resources_scheduled` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
