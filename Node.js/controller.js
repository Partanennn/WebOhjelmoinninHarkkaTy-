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
    
    machinesSearch: (req, res) => {
        let v = req.body;
        console.log("Name::: "+JSON.stringify(req.body));
        
        CONN.query("SELECT * FROM machines WHERE name LIKE '%"+ v.name +"%' AND model LIKE '%"+ v.model +"%' AND brand LIKE '%"+ v.brand +"%' AND description_text LIKE '%"+ v.description +"%' AND location LIKE '%"+ v.location +"%' AND owner LIKE '%"+ v.owner +"%' AND category LIKE '%"+ v.category +"%' AND serial_number LIKE '%"+ v.serial +"%'", 
            (error, result, fields) => {
                if(error) {
                    console.log("Error while fetching machines from machines table, reason: "+error.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': error.sqlMessage});
                } else {
                    console.log("Succesfully fetched all machines from machines table");
                    res.status(200).json(result);
                }
            }
        );
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
    }
}