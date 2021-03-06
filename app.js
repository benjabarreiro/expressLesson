const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const productsRouter = require('./routes/products');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');

const logMiddleware = require('./middlewares/logMiddleware');
const recordameMiddleware = require('./middlewares/recordameMiddleware');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Server running in port 3000');
});

app.use(logMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'Secret!!!'}));
app.use(methodOverride("_method"));
app.use(recordameMiddleware);

app.use('/products', productsRouter);
app.use('/', mainRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    res.status(404).render("not-found");
});