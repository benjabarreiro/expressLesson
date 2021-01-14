module.exports = {
    home: function(req, res) {
        res.send('Welcome!');
    },
    contact: function(req, res) {
        res.send('Contact us!');
    },
    anArray: function(req, res) {
        res.send([1,2,3,4]);
    },
    anObject: function(req, res) {
        res.send({name: "Benjamin"});
    }
}