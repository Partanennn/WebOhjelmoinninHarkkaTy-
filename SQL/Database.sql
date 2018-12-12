CREATE DATABASE kanta;
USE kanta;

-- Käyttäjien tietokanta
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


-- Omistajien tietokanta
CREATE TABLE kanta.owners
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varChar(40) NOT NULL
)
ENGINE = InnoDB;


-- Kategorioiden tietokanta
CREATE TABLE kanta.categories
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category varChar(20) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE kanta.status
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status varChar(20) NOT NULL
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
    category int NOT NULL,
    status int DEFAULT 2,
    CONSTRAINT machines_status_fk FOREIGN KEY (status) REFERENCES status(id),
    CONSTRAINT machines_owner_fk FOREIGN KEY (owner) REFERENCES owners(id),
    CONSTRAINT machines_category_fk FOREIGN KEY (category) REFERENCES categories(id)
)
ENGINE = InnoDB;


-- Lainojen tietokanta
CREATE TABLE kanta.lainat
(
    laina_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id varChar(20) NOT NULL,
    machine_id int NOT NULL,
    start_day DATE NOT NULL,
    end_day DATE NOT NULL,
    CONSTRAINT lainat_machineid_fk FOREIGN KEY (machine_id) REFERENCES machines(serial_number),
    CONSTRAINT lainat_userid_fk FOREIGN KEY (user_id) REFERENCES users(username)
)
ENGINE = InnoDB;