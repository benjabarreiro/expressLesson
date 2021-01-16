let fs = require('fs');

let contenido = fs.readFileSync('prueba.txt', {encoding: 'utf-8'});

console.log(contenido);