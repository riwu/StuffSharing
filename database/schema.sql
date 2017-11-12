-- MySQL Workbench Synchronization
-- Generated: 2017-10-04 14:18
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: singhaniasnigdha

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(16) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `isAdmin` VARCHAR(10) NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`stuff` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  `condition` INT(11) NOT NULL,
  `price` FLOAT(11) NOT NULL DEFAULT 0,
  `owner` INT(11) NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  `available_from` DATE NULL DEFAULT NULL,
  `max_loan_period` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `owner_idx` (`owner` ASC),
  CONSTRAINT `owner`
    FOREIGN KEY (`owner`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`bid_log` (
  `bid_amt` FLOAT(11) NULL DEFAULT 0,
  `user_id` INT(11) NOT NULL,
  `stuff_id` INT(11) NOT NULL,
  `date_and_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(20) DEFAULT 'success',
  PRIMARY KEY (`user_id`, `stuff_id`, `date_and_time`),
  INDEX `fk_bid_log_user1_idx` (`user_id` ASC),
  INDEX `fk_bid_log_stuff1_idx` (`stuff_id` ASC),
  CONSTRAINT `fk_bid_log_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bid_log_stuff1`
    FOREIGN KEY (`stuff_id`)
    REFERENCES `mydb`.`stuff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`loan_log` (
  `stuff` INT(11) NOT NULL,
  `borrower` INT(11) NOT NULL,
  `loan_date_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `return_date` DATE NULL DEFAULT NULL,
  `price` FLOAT(11) NULL DEFAULT 0,
  PRIMARY KEY (`stuff`, `borrower`, `loan_date_time`),
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
