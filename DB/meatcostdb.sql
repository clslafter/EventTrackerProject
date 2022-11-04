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
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `street2` VARCHAR(45) NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zip_code` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `store` ;

CREATE TABLE IF NOT EXISTS `store` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_store_address1_idx` (`address_id` ASC),
  CONSTRAINT `fk_store_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meat_purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meat_purchase` ;

CREATE TABLE IF NOT EXISTS `meat_purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `meat_type` VARCHAR(100) NOT NULL,
  `meat_cut` VARCHAR(200) NULL,
  `price_in_usdollars` DECIMAL NULL,
  `price_per_pound` DECIMAL NULL,
  `weight_in_pounds` DECIMAL NULL,
  `on_sale` TINYINT NULL,
  `purchase_date` DATETIME NULL,
  `store_id` INT NOT NULL,
  `create_date` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_meat_purchase_store_idx` (`store_id` ASC),
  CONSTRAINT `fk_meat_purchase_store`
    FOREIGN KEY (`store_id`)
    REFERENCES `store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `meatcostdb`;
INSERT INTO `address` (`id`, `street`, `street2`, `city`, `state`, `zip_code`) VALUES (1, '637 Robert Blvd', NULL, 'Slidell', 'Louisiana', 70458);
INSERT INTO `address` (`id`, `street`, `street2`, `city`, `state`, `zip_code`) VALUES (2, '1644 Gause Blvd E', NULL, 'Slidell', 'Louisiana', 70458);
INSERT INTO `address` (`id`, `street`, `street2`, `city`, `state`, `zip_code`) VALUES (3, '2985 Gause Blvd', NULL, 'Slidell', 'Louisiana', 70461);

COMMIT;


-- -----------------------------------------------------
-- Data for table `store`
-- -----------------------------------------------------
START TRANSACTION;
USE `meatcostdb`;
INSERT INTO `store` (`id`, `name`, `address_id`) VALUES (1, 'Wal-Mart Neighborhood Market', 1);
INSERT INTO `store` (`id`, `name`, `address_id`) VALUES (2, 'Rouses', 2);
INSERT INTO `store` (`id`, `name`, `address_id`) VALUES (3, 'Winn-Dixie', 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `meat_purchase`
-- -----------------------------------------------------
START TRANSACTION;
USE `meatcostdb`;
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (1, 'chicken', 'thighs', 15.07, 2.63, 5.73, NULL, '2022-11-04 16:59', 1, '2022-11-04 17:00');
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (2, 'beef', '90% lean ground meat', 28.54, 6.56, 4.35, NULL, '2022-11-04-17:00', 1, '2022-11-04-17:01');
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (3, 'pork', 'pork chops', 11.01, 3.53, 3.12, NULL, '2022-11-04-17:02', 2, '2022-11-04-17:03');
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (4, 'fish', 'catfish fillets', 17.11, 11.33, 1.51, NULL, '2022-11-04-17:03', 2, '2022-11-04-17:04');
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (5, 'beef', 'bottom round', 28.47, 6.56, 4.34, 0, '2022-11-04-17:06', 1, '2022-11-04-17:07');
INSERT INTO `meat_purchase` (`id`, `meat_type`, `meat_cut`, `price_in_usdollars`, `price_per_pound`, `weight_in_pounds`, `on_sale`, `purchase_date`, `store_id`, `create_date`) VALUES (6, 'pork', 'spareribs', 40.82, 3.99, 10.23, 1, '2022-11-04-17:07', 3, '2022-11-04-17:08');

COMMIT;

