const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Settings
app.set('port', port)

//middleworks
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//statics resources
app.use(express.static("public"));

//Routes
app.use(require('./server/Router/Routes/routerGetter'));
app.use(require('./server/Router/Routes/routerPoster'));

//Listen server
app.listen(port, () => {
    console.log('Working on port: ' + port);
});