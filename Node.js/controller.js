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
    }
}