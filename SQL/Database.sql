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

INSERT INTO users(name, streetAddress, city, email, username, pass, role) VALUES("Testi Jäbä", "Microkatu 1", "Kuopio", "testi@email.fi", "testi", "testi", "admin");
INSERT INTO users(name, streetAddress, city, email, username, pass) VALUES("Erkki Pesonen", "Microkatu 5", "Kuopio", "pesoserkki@uef.fi", "erkki", "erkki");
INSERT INTO users(name, streetAddress, city, email, username, pass) VALUES("Paavo Pakoma", "Microkatu 66", "Kuopio", "puavo@ueffi.fi", "paavo", "pakoma");