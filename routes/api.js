var projets = [
    {"id ": "0", "projet": "projet 0", "client": "client", "datedebut": "01-01-2013", "datefin": "10-09-2013"},
    {"id ": "1", "projet": "projet 1", "client": "client1", "datedebut": "01-01-2013", "datefin": "10-09-2013"}
];
var employesData = [
    {"id": "0", "nom": "DUPONT", "prenom": "Christophe", "fonction": "Chef de projet", "client": "AXA", "date": "2012-04-01"},
    {"id": "1", "nom": "Nom", "prenom": "prenom1", "fonction": "Chef de projet", "client": "AXA", "date": "2012-04-01"},
    {"id": "2", "nom": "Nom1", "prenom": "Pre1", "fonction": "COM", "client": "", "date": "2012-04-01"},
    {"id": "3", "nom": "NOM2", "prenom": "Pre1", "fonction": "ING", "client": "la poste", "date": "2012-04-01"}
];
var users = [
    {login: 'admin', pwd: 'admin'},
    {login: 'user', pwd: 'admin'}
];

var usersLoggedIn = [
];

//******************

exports.isLoggedIn = function(req, res) {
    var _login = req.query.login;
    var _pwd = req.query.pwd;
    var logged = false;
    for (i = 0; i < usersLoggedIn.length; i++) {
        if (usersLoggedIn[i].login === _login && usersLoggedIn[i].pwd === _pwd) {
            logged = true;
            break;
        }
    }
    res.json(logged);
};

exports.isRegistred = function(req, res) {
    var _login = req.query.login;
    var _pwd = req.query.pwd;
    var loggedUser = null;
    var exist = false;
    for (i = 0; i < users.length; i++) {
        if (users[i].login === _login && users[i].pwd === _pwd) {
            exist = true;
            loggedUser = users[i];
            usersLoggedIn.push(users[i]);
            break;
        }
    }
    res.json({exist: exist, user: loggedUser});
};

//*****************

exports.projets = function(req, res) {
    res.json(projets);
};

//********************
// GET
exports.employes = function(req, res) {
    res.json(employesData);
};

exports.employe = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && employesData.length > 0) {
        res.json(employesData[id]
                );
    } else {
        res.json(false);
    }
};
// POST
exports.addEmploye = function(req, res) {
    var id = employesData.length;
    req.body.id = id;
    employesData.push(req.body);
    res.json(req.body);
};

// PUT
exports.editEmploye = function(req, res) {
    var id = req.params.id;
    if (id >= 0 && employesData.length > 0) {
        employesData[id] = req.body;
        res.json(true);
    } else {
        res.json(false);
    }
};

// DELETE
exports.deleteEmploye = function(req, res) {
    var id = req.params.id;

    if (id >= 0 && employesData.length > 0) {
        employesData.splice(id, 1);
        res.json(true);
    } else {
        res.json(false);
    }
};