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
                    console.log("Virhe haettaessa yhden käyttäjän tieto tietoja tietokannasta users-taulusta, syy: "+error.sqlMessage);
                    res.status(500).json({'status': 'not ok', 'status_text': error.sqlMessage});
                } else {
                    console.log("Yhden käyttäjän tiedot haettu onnistuneesti users-taulusta");
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
  
        CONNECTION.query('UPDATE users SET name=?, WHERE username=?', [c.username, key],
          function(error, results, fields){
            if ( error ){
                console.log("Error while trying to update "+key+" in users table, reason: " + error);
                res.send(error);
            }
            else
            {
                console.log("Data updated for user "+key+", ";
                res.statusCode = 204;
                res.send();
            }
          }
        );
    }
}