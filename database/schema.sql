-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`stuff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`stuff` (
  `id` INT ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  `condition` INT NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `owner` INT NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  `available_from` DATE NULL,
  `max_loan_period` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `owner_idx` (`owner` ASC),
  CONSTRAINT `owner`
    FOREIGN KEY (`owner`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bid_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bid_log` (
  `stuff` INT NOT NULL,
  `bidder` INT NOT NULL,
  `bid_amt` FLOAT NOT NULL DEFAULT 0,
  PRIMARY KEY (`bidder`, `stuff`),
  INDEX `stuff_idx` (`stuff` ASC),
  CONSTRAINT `stuff`
    FOREIGN KEY (`stuff`)
    REFERENCES `mydb`.`stuff` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `bidder`
    FOREIGN KEY (`bidder`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`loan_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`loan_log` (
  `stuff` INT NOT NULL,
  `borrower` INT NOT NULL,
  `loan_date` DATE NOT NULL,
  `return_date` DATE NULL,
  `price` FLOAT NULL DEFAULT 0,
  PRIMARY KEY (`stuff`, `borrower`),
  INDEX `borrower_idx` (`borrower` ASC),
  CONSTRAINT `stuff`
    FOREIGN KEY (`stuff`)
    REFERENCES `mydb`.`stuff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `borrower`
    FOREIGN KEY (`borrower`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
