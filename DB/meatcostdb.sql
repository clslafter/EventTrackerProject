-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema meatcostdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `meatcostdb` ;

-- -----------------------------------------------------
-- Schema meatcostdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meatcostdb` DEFAULT CHARACTER SET utf8 ;
USE `meatcostdb` ;

-- -----------------------------------------------------
-- Table `meat_purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meat_purchase` ;

CREATE TABLE IF NOT EXISTS `meat_purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `meat_type` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS meatcostuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'meatcostuser'@'localhost' IDENTIFIED BY 'meatcostuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'meatcostuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `meat_purchase`
-- -----------------------------------------------------
START TRANSACTION;
USE `meatcostdb`;
INSERT INTO `meat_purchase` (`id`, `meat_type`) VALUES (1, 'chicken');
INSERT INTO `meat_purchase` (`id`, `meat_type`) VALUES (2, 'beef');

COMMIT;

