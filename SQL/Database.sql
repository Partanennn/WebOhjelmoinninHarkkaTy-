CREATE DATABASE kanta;
USE kanta;

CREATE TABLE kanta.users
(
    username varChar(20) NOT NULL PRIMARY KEY,
    pass varChar(20) NOT NULL,
    name varChar(40) NOT NULL,
    streetAddress varChar(80),
    city varChar(40),
    email varChar(60),
    role varChar(20) NOT NULL DEFAULT "user"
)
ENGINE = InnoDB;


-- Laitteiden tietokanta
CREATE TABLE kanta.machines
(
    serial_number int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varChar(40) NOT NULL,
    model varChar(40) NOT NULL,
    brand varChar(40) NOT NULL,
    description_text varChar(200) DEFAULT "Tyhja",
    location varChar(80) NOT NULL,
    owner int NOT NULL,
    category varChar(20) NOT NULL
)
ENGINE = InnoDB;
