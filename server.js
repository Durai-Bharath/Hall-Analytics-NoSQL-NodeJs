require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const hallController = require('./controllers/hallController');
const studentController = require('./controllers/studentController'); 
const facultyController = require('./controllers/facultyController'); 
const aggregateController = require('./controllers/aggregateController'); 



var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});



app.get('/', (req, res) => {
    res.sendFile(__dirname+'/Frontend/collection.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/Frontend/aggregate.html');
});



app.use('/hall',hallController);
app.use('/student',studentController);
app.use('/faculty',facultyController);
app.use('/aggregate',aggregateController);