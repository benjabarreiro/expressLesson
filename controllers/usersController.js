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
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let usersJSON = fs.readFileSync('users.json', {encoding: 'utf-8'});
            let users;
            if(usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }
            let usuarioALoguearse;

            for(let i=0; i<users.length; i++) {
                if(users[i].email == req.body.email) {
                    if(bcrypt.compareSync(req.body.password, users[i].password)) {
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            if(usuarioALoguearse == undefined) {
                return res.render('login', {errors: [
                    {msg: 'Credenciales invalidas'}
                ]});
            }

            req.session.usuarioLogueado = usuarioALoguearse;

            if(req.body.recordame != undefined) {
                res.cookie('recordame', usuarioALoguearse.email, {maxAge: 60000})
            }

            res.render('userList');
        } else {
            return res.render('login', {errors: errors.errors});
        }
    },
    list: function(req, res) {
        let archivoJSON = fs.readFileSync('users.json', {encoding: 'utf-8'});

        let users = JSON.parse(archivoJSON);
        res.render('userList', {users:users});
    },
    search: function(req, res) {
        let loQueBuscoElUsuario = req.query.search;

        let archivoJSON = fs.readFileSync('users.json', {encoding: 'utf-8'});

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
                //avatar: req.files[0].filename
            };
    
            //GUARDARLA
            let archivoUsuario = fs.readFileSync('users.json', {encoding: 'utf-8'});
            let usuarios;
            if(archivoUsuario == "") {
                usuarios = [];
            } else {
                usuarios = JSON.parse(archivoUsuario);
            }
    
            usuarios.push(usuario);
    
            usuariosJSON = JSON.stringify(usuarios);
    
            fs.writeFileSync('users.json', usuariosJSON)
    
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