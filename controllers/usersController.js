module.exports = {
    register: function(req, res) {
        res.render('register');
    },
    login: function(req, res) {
        res.render('login');
    },
    list: function(req, res) {
        let users = [
            "Darío",
            "Javier",
            "Maru",
            "Ale",
            "Alan"
        ];
        res.render('userList', {users:users});
    },
    search: function(req, res) {
        let loQueBuscoElUsuario = req.query.search;
        
        let users = [
            "Darío",
            "Javier",
            "Maru",
            "Ale",
            "Alan"
        ];

        let usersResults = [];

        for(let i=0; i<users.length; i++) {
            if(users[i].name.include(loQueBuscoElUsuario)) {
                usersResults.push(users[i]);
            }
        }

        res.render('usersResults', {usersResults: usersResults});
    },
    create: function(req, res) {
        let usuario = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            email: req.body.email
        };

        res.redirect('/users/list');
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