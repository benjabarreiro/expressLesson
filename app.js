const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const mainRouter = require('./routes/main');

app.listen(3000, () => {
    console.log('Server running in port 3000');
});

app.use('/products', productsRouter);
app.use('/', mainRouter);