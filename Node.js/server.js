var express = require('express');
var controller = require('./controller');
var app = express();
var port = 3001;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

// REST API
app.route("/users/all")
    .get(controller.fetchAll);

app.route("/users/:tunnus") 
    .get(controller.fetchOneUser);



app.listen(port, () => {
    console.log("Serveri kuuntelee porttia "+port);
});
