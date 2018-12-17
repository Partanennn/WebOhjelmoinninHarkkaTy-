var express = require('express');
var bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REST API
app.route("/users")
    .get(controller.fetchAll)
    .post(controller.createUser);
    
app.route("/users/:tunnus") 
    .get(controller.fetchOneUser)
    .put(controller.updateUser);

app.route("/varaukset/add/:juu")
    .put(controller.addRent);

app.route("/owners")
    .get(controller.fetchOwners);

app.route("/categories")
    .get(controller.fetchCategories);

app.route("/rent_machines")
    .get(controller.machinesRent);

app.route("/machines")
    .post(controller.machinesSearch);

app.route("/machines/add")
    .post(controller.createMachine);

app.route("/machines/:id")
    .put(controller.updateMachine)
    .get(controller.fetchOneMachine)
    .delete(controller.deleteMachine);

app.route("/lainat")
    .post();


app.listen(port, () => {
    console.log("Server is listening port "+port);
});
