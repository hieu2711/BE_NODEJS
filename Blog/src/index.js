const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const db = require('./config/db');
const route = require('./routes');
const app = express();
const port = 3000;

// HTTP logger
app.use(morgan('combined'));
// Template engine
app.engine('hbs', handlebars.engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));
//sử dụng cái hình ảnh
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

route(app);

// Connect to DB
db.connect();

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
