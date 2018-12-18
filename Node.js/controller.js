'use strict';
var mysql = require('mysql');

const CONN = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kanta'
});

module.exports = 
{
    // Hakee kaiken datan users tablesta
    fetchAll: (req, res) => {
        CONN.query('SELECT * FROM users', (err, result, fields) => {
            if(err) {
                console.log("Virhe haettaessa dataa users-tablesta, syy"+err);
                res.status(500).json({'status': 'not ok', 'status_text': err.sqlMessage });
            } else {
                console.log("Tiedot haettu onnistuneesti users tablesta");
                res.status(200).json(result);
            }
        });
    },

    editRent: (req, res) => {
        let key = req.params.juu;

        CONN.query('SELECT * FROM machines WHERE serial_number=?', [key], 
            (err, result, fields) => {
                if(err) {
                    console.log("Error while trying to get machine data to edit rent, reason: "+err.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': err.sqlMessage });                 
                } else {
                    console.log("Succesfully fetched all data for machine:):)");
                    res.status(200).json(result);
                }
        });
    },

    // Hakee yhden henkilön tiedot users taulusta
    fetchOneUser: (req, res) => {
        var username = req.params.tunnus;
        CONN.query('SELECT * FROM users WHERE username=?', [username],
            (error, result, fields) => {
                if(error) {
                    console.log("Error while trying to fetch data for user, reason: "+error.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': error.sqlMessage});
                } else {
                    console.log("Data for "+ username +" fetched succesfully from table");
                    res.status(200).json(result);
                }
            }
        );

    },
    
    fetchOneMachine: (req, res) => {
        let c = req.params.id;
        
        CONN.query('SELECT * FROM machines WHERE serial_number=?', [c], 
        (error, results, fields) => {
            if(error) {
                console.log("Error while fethching one machine info from machines-table, reason: "+error);
                res.json({"status": 500, "error": error, "response": null});                    
            } else {
                console.log("Succesfully fetched one machine from machines table");
                res.status(200).json(results);
            }
        })
    },
    
    fetchOwners: (req, res) => {
        
        CONN.query('SELECT * FROM owners', 
            (err, results, fields) => {
                if(err) {
                    console.log("Error while trying to fetch owners, reason: "+err.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': err.sqlMessage});
                } else {
                    console.log("All owners fetched succesfully!");
                    res.status(200).json(results);
                }
            }
        );
    },

    fetchCategories: (req, res) => {

        CONN.query('SELECT * FROM categories', 
            (err, results, fields) => {
                if(err) {
                    console.log("Error while trying to fetch all categories, reason: "+err.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': err.sqlMessage});
                } else {
                    console.log("All categories fetched succesfully from categories-table");
                    res.status(200).json(results);
                }
            }
        );
    },

    machinesRent: (req, res) => {

        CONN.query("SELECT m.name as nimi, m.model, m.brand, m.description_text, m.location, o.name as owner, c.category, m.borrower ,m.serial_number, s.status FROM machines m LEFT JOIN categories c ON m.category = c.id LEFT JOIN users u ON m.borrower = u.username LEFT JOIN owners o ON m.owner = o.id LEFT JOIN status s ON s.id = m.status WHERE m.status = 3 OR m.status = 1",
        (error, result, fields) => {
            if(error) {
                console.log("Error while trying to fetch all machines, reason: "+error.sqlMessage);
                res.status(500).json({'status': 'not ok', 'status_text': error.sqlMessage});
            } else {
                console.log("Machines fetched from database");
                res.status(200).json(result);
            }
        });
    },

    machinesSearch: (req, res) => {
        let v = req.body;
        //console.log("Name::: "+JSON.stringify(req.body));
        
        CONN.query("SELECT m.name as nimi, m.model, m.brand, m.description_text, m.location, o.name as owner, c.category, m.serial_number, s.status as staatus, m.status FROM machines m LEFT JOIN categories c ON m.category = c.id LEFT JOIN owners o ON m.owner = o.id LEFT JOIN status s ON s.id = m.status WHERE m.name LIKE '%"+ v.name +"%' AND m.model LIKE '%"+ v.model +"%' AND m.brand LIKE '%"+ v.brand +"%' AND m.description_text LIKE '%"+ v.description +"%' AND m.location LIKE '%"+ v.location +"%' AND o.name LIKE '%"+ v.owner +"%' AND c.category LIKE '%"+ v.category +"%' AND m.serial_number LIKE '%"+ v.serial +"%'", 
            (error, result, fields) => {
                if(error) {
                    console.log("Error while fetching machines from machines table, reason: "+error.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': error.sqlMessage});
                } else {
                    console.log("Succesfully fetched machines from machines table");
                    res.status(200).json(result);
                }
            }
        );
    },

    updateMachine: (req, res) => {
        let c = req.body;
        let key = req.params.id;

        CONN.query('UPDATE machines SET name=?, model=?, brand=?, description_text=?, location=?, owner=?, category=? WHERE serial_number=?', [c.edit_name, c.edit_model, c.edit_brand, c.edit_desc, c.edit_location, c.edit_owner, c.edit_category, key], 
            (error, results, fields) => {
                if(error) {
                    console.log("Error while trying to update ("+ key +") machine info, reason: "+error.sqlMessage);
                    res.send(error);
                } else {
                    console.log("Data updated for machines table with "+key+" id");
                    res.statusCode = 204;
                    res.send();
                }
            })
    },
 
    createUser: (req, res) => {
        console.log("Body: " + JSON.stringify(req.body));
        let v = req.body;

        CONN.query('INSERT INTO users (username, pass, name, streetAddress, city, email) VALUES (?, ?, ?, ?, ?, ?)', [v.account_name, v.reg_pwd, v.user_name, v.user_address, v.user_city, v.user_email],
            (err, results, fields) => {
                if(err) {
                    console.log("Error while tried to add new user to users table, reason: "+err);
                    res.json(err);
                } else {
                    console.log("New user added to table users: "+JSON.stringify(results));
                    res.statusCode = 201;
                }
            }
        );
    },

    createMachine: (req, res) => {
        let v = req.body;

        CONN.query('INSERT INTO machines (name, model, brand, description_text, location, owner, category) VALUES (?, ?, ?, ?, ?, ?, ?)', [v.add_name, v.add_model, v.add_brand, v.add_desc, v.add_location, v.add_owner, v.add_category],
            (error, results, fields) => {
                if(error) {
                    console.log("Error while trying to add new machine, reason: "+error.mysql);
                    res.json(error);
                } else {
                    console.log("Succesfully added new machine to machines table!:))");
                    res.statusCode = 201;
                }
            });
    },

    updateUser: (req, res) => {
        let c = req.body; // Form fields
        let key = req.params.tunnus; // Username
  
        CONN.query('UPDATE users SET name=?, streetAddress=?, city=?, email=? WHERE username=?', [c.user_name, c.user_address, c.user_city, c.user_email, key],
          function(error, results, fields){
            if ( error ){
                console.log("Error while trying to update "+key+" in users table, reason: " + error);
                res.send(error);
            }
            else
            {
                console.log("Data updated for user "+key);
                res.statusCode = 204;
                res.send();
            }
          }
        );
    },

    addRent: (req, res) => {
        let v = req.body;
        let key = req.params.juu;
        console.log("Tunnus: "+key);
        console.log(JSON.stringify(v));
        CONN.query('UPDATE machines SET start_day=?, end_day=?, borrower=?, status=3 WHERE serial_number=?', [v.rent_date_start, v.rent_date_end, v.rent_user_name, key], 
            (err, results, fields) => {
                if(err) {
                    console.log("Error while trying to add new rent, reason: "+err);
                    res.json(err);
                } else {
                    console.log("New rent added to lainat-table");
                    res.statusCode = 204;
                    res.send();
                }
            }
        );
    },

    cancelRent: (req, res) => {
        let key = req.params.id;
        
        CONN.query('UPDATE machines SET start_day=null, end_day=null, status=2, borrower=null WHERE serial_number=?', [key],
            (err, result, fields) => {
                if(err) {
                    console.log("Error while trying to cancel rent, reason: "+err.sqlMessage);
                    res.json(err);
                } else {
                    console.log("Rent removed succesufully:)");
                    res.statusCode = 204;
                    res.send();
                }
            })
    },

    deleteMachine: (req, res) => {
        let key = req.params.id;

        CONN.query('DELETE FROM machines WHERE serial_number=?', [key],
        (error, results, fields) => {
            if(error) {
                console.log("Error while trying to delete data from machines-table, reason: "+error.sqlMessage);
                res.send(error);
            } else {
                console.log("Data deleted from machines table");
                res.statusCode = 204;
                res.send();
            }
        });
    }
}