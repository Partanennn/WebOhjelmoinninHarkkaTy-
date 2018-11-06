CREATE DATABASE kanta;
USE kanta;

CREATE TABLE kanta.users
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    forename varChar(40) NOT NULL,
    surename varChar(40) NOT NULL,
    streetAddress varChar(80) NOT NULL,
    postcode char(5) NOT NULL,
    city varChar(40) NOT NULL,
    email varChar(60) NOT NULL,
    username varChar(20) NOT NULL,
    pass varChar(20) NOT NULL,
    role varChar(20) NOT NULL DEFAULT "user",
    logged BOOLEAN NOT NULL DEFAULT 0
)
ENGINE = InnoDB;

CREATE TABLE kanta.post
(
    postcode char(5) NOT NULL PRIMARY KEY,
    city varChar(130)
)
ENGINE = InnoDB;

-- Laitteiden tietokanta
CREATE TABLE kanta.machines
(
    serial_number int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mach_name varChar(40) NOT NULL,
    model varChar(40) NOT NULL,
    brand varChar(40) NOT NULL,
    description_text varChar(200) DEFAULT "Tyhja",
    loc varChar(80) NOT NULL,
    mach_owner int NOT NULL,
    category varChar(20) NOT NULL
)
ENGINE = InnoDB;

INSERT INTO users(forename, surename, streetAddress, postcode, city, email, username, pass) VALUES("Testi", "Jäbä", "Microkatu 1", "70100", "Kuopio", "testi@email.fi", "testi", "testi");