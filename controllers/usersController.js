let fs = require('fs');
let bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator');

module.exports = {
    register: function(req, res) {
        res.render('register');
    },
    login: function(req, res) {
        res.render('login');
    },
    processLogin: function(req, res) {
        let archivoUsuario = fs.readFileSync('usarios.json', {encoding: 'utf-8'});

        let usuarios;

        if(archivoUsuario == "") {
            usuarios = [];
        } else {
            usuarios = JSON.parse(archivoUsuario);
        }

        for(let i=0; i<usuarios.length; i++) {
            if(usuarios[i].email == req.body.email && bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                res.send('Te encontré!');
            }
        }

        res.send('error');
    },
    list: function(req, res) {
        let archivoJSON = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});

        let users = JSON.parse(archivoJSON);
        res.render('userList', {users:users});
    },
    search: function(req, res) {
        let loQueBuscoElUsuario = req.query.search;

        let archivoJSON = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});

        let users = JSON.parse(archivoJSON);
        
        let usersResults = [];

        for(let i=0; i<users.length; i++) {
            if(users[i].name.include(loQueBuscoElUsuario)) {
                usersResults.push(users[i]);
            }
        }

        res.render('usersResults', {usersResults: usersResults});
    },
    create: function(req, res, next) {
        console.log(validationResult);

        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let usuario = {
                username: req.body.username,
                edad: req.body.edad,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.files[0].filename
            };
    
            //GUARDARLA
            let archivoUsuario = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});
            let usuarios;
            if(archivoUsuario == "") {
                usuarios = [];
            } else {
                usuarios = JSON.parse(archivoUsuario);
            }
    
            usuarios.push(usuario);
    
            usuariosJSON = JSON.stringify(usuarios);
    
            fs.writeFileSync('usuarios.json', usuariosJSON)
    
            res.redirect('/users/list');
        } else {
            res.render('register', {errors: errors.errors});
        };
    },
    edit: function(req, res) {
        let = idUser = req.params.idUser;

        let users = [
            "Darío",
            "Javier",
            "Maru",
            "Ale",
            "Alan"
        ];

        let userToEdit = users[idUser];

        res.render('userEdit', {userToEdit:userToEdit});
    }
}