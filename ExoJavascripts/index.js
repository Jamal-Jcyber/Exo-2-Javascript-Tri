const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


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



// @ route get the home page.
// @ desc:

app.get('/', (req, res, next) => {
    //res.send('It\'s Work Correctly');
    res.render('index.ejs', { title: 'Formula For Adding New Record'})
});



// @ route get all data from the database.
// desc:

app.get('/all', (req, res, next) => {
    const sql = "SELECT * FROM users";
    connection.query(sql, (err, data) => {
        if(err) throw err
        res.render('display.ejs', {title: 'Here You Have The All Records', records:data });
    });
});

// @ route classification using age
// desc:

app.get('/all/age', (req, res, next) => {
    const sql = 'SELECT * FROM users ORDER BY Age DESC';
    connection.query(sql, (err, data) => {
        if(err) throw err
        res.render('age.ejs', { title: 'This Table Classified With The Age', records:data});
    });
});

// @ route classification using Alphabet
// desc:

app.get('/all/alpha', (req, res, next) => {
    const sql = 'SELECT * FROM users ORDER BY FirstName ASC';
    connection.query(sql, (err, data) => {
        if(err) throw err
        res.render('alpha.ejs', { title: 'This Table Classified With The FirstName', records:data});
    });
});

// @ POST Method to add new record to the database.
// desc:

app.post('/add', (req, res, next) => {

    const input = req.body;

        fname = input.firstname;
        lname = input.lastname;
        age   =   input.age;
        prof  =  input.profession;
    
    const sql = " INSERT INTO users (FirstName, LastName, Age, Profession) VALUES ('"+fname+"', '"+lname+"', '"+age+"', '"+prof+"')";

    connection.query(sql, (err, result) => {
        if(err) throw err
        res.render('index.ejs', { message_success: 'Record was Added Successfully to the DataBase'});
    });

});
























const port = 3030;
app.listen(port, () => {
    console.log(`the server is running on the port ${port}`);
});