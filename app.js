const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 4000;

//Middleworks
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser('mysecret'));
app.use(session({
    secret: 'mysecret',
    resave: true,
    cookie: {
        expires: 3600000,
    },
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 },
}));

//template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//statics resources
app.use(express.static("public"));

//routes
app.use('/', require('./server/routerNode/routerGetter'));
app.use('/', require('./server/routerNode/routerPoster'));
app.use('/', require('./server/routerNode/routerPut'));
app.use('/', require('./server/routerNode/routerDeleter'));
app.use((rep, res, next) => {
        res.status(404).render("404");
    })

//Escuchar server
app.listen(port, () => {
    console.log('Servidor a su servicio en el puerto: ', port)

});
