const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const User = require('./src/Model/User');

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './views/')));

const connection = mysql.createConnection({
    host: "127.0.0.1" || "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "Test_Exo"

});

connection.connect((err) => {
    if(err) throw err
    console.log('Connection was established successfully :)')
});


// @ routes
// @ desc
app.get('/', (req, res, next) => {
    //res.send('It\'s Work Correctly');
    res.render('index.ejs', { title: 'Formula For Adding New Record'})
});

// @ POST Method to add new record to the database
app.post('/', (req, res, next) => {

    const input = req.body;
    const user = new User({
        fname : input.firstname,
        lname : input.lastname,
        age   :   input.age,
        prof  :  input.profession
    });

    const sql = 'INSERT INTO `users` (`firstname`, `lastname`, `age`, `profession`) VALUES ('+user.fname+', '+user.lname+', '+user.age+', '+user.prof+')';
    
    connection.query(sql, (err, result) => {
        if(err) throw err
        res.render('index.ejs', { message_success: 'Record was Added Successfully to the DataBase', data:result});
    });

});
























const port = 3030;
app.listen(port, () => {
    console.log(`the server is running on the port ${port}`);
});