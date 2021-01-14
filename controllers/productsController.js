module.exports = {
    products: function(req, res) {
        res.send('Our products!');
    },
    detail: function(req, res) {
        res.send('Welecome to the detail of product ' + req.params.id);
    },
    opinion: function(req, res) {
        if(req.params.idOpinion == undefined) {
            res.send('Welcome to the opinions of product ' + req.params.id);
        } else {
            res.send('Welcome to the opinions of product ' + req.params.id + ' and you are in the opinion ' + req.params.idOpinion);
        }
    }
}