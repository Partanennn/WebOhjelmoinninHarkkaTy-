    INSERT INTO users(name, streetAddress, city, email, username, pass, role) VALUES("Testi Jäbä", "Microkatu 1", "Kuopio", "testi@email.fi", "testi", "testi", "admin");
    INSERT INTO users(name, streetAddress, city, email, username, pass) VALUES("Erkki Pesonen", "Microkatu 5", "Kuopio", "pesoserkki@uef.fi", "erkki", "erkki");
    INSERT INTO users(name, streetAddress, city, email, username, pass) VALUES("Paavo Pakoma", "Microkatu 66", "Kuopio", "puavo@ueffi.fi", "paavo", "pakoma");

    INSERT INTO owners(name) VALUES("SAVONIA");
    INSERT INTO owners(name) VALUES("UEF");

    INSERT INTO categories(category) VALUES("Tulostin");
    INSERT INTO categories(category) VALUES("Kannettava");
    INSERT INTO categories(category) VALUES("Tabletti");
    INSERT INTO categories(category) VALUES("Tietokone");

    INSERT INTO status(status) VALUES("LAINATTU");
    INSERT INTO status(status) VALUES("HYLLYSSÄ");
    INSERT INTO status(status) VALUES("VARATTU");

    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("HP Pavilion 570-p038no", "Pavilion 570-p038no", "HP", "Kelpo tietokone", "B2002", 1, 4);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("HP Pavilion 570-p038no", "Pavilion 570-p038no", "HP", "Kelpo tietokone", "B2002", 1, 4);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("HP Pavilion 570-p038no", "Pavilion 570-p038no", "HP", "Kelpo tietokone", "e26-27", 2, 4);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("Brother DCP-L2537DW AIO", "DCP-L2537DW AIO", "Brother", "Savonian tulostin mikrokadulla", "B2002", 1, 1);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("Brother DCP-L2537DW AIO", "DCP-L2537DW AIO", "Brother", "Yliopiston tulostin luokassa e26-27", "e26-27", 2, 1);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("MacBook Air MQD32", "MQD32", "MacBook Air", "Tää on aito mäkbuuk", "SN-kirjasto", 2, 2);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("MacBook Air MQD32", "MQD32", "MacBook Air", "Tää on aito mäkbuuk", "SN-kirjasto", 2, 2);
    INSERT INTO machines(name, model, brand, description_text, location, owner, category) VALUES("Huawei MediaPad T3", "MediaPad T3", "Huawei", "Tabletti Snellmanian kirjastossa", "SN-kirjasto", 2, 3);