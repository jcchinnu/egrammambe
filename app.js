var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');

// Set up connection to database.
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zessta',
  database: 'my-db',
});
app.use(bodyParser.json());
//app.use(app.router);


// Connect to database.
// connection.connect();
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
//to post the imp persons inf
app.post('/imp', function(req, res) {
  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO imp SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
//to get all database values of imp persons
app.get('/imp', function (req, res) {
  connection.query('SELECT * FROM imp', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//to update the information of imp persons
app.put('/imp', function (req, res) {
  connection.query('UPDATE `imp` SET `pname`=?,`phoneno`=?,`avtime`=? WHERE `position`=?', [req.body.pname, req.body.phoneno,req.body.avtime,req.body.position], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//to delete the information of a user in inf
app.delete('/imp', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `imp` WHERE `position`=?', [req.body.position], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});
//to post complaints
app.post('/complaints', function(req, res) {


  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO complaints SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
//to get all complaints
app.get('/complaints', function (req, res) {
  connection.query('SELECT * FROM complaints', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//to delete the complaints
app.delete('/complaints', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `complaints` WHERE `cname`=?', [req.body.cname], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});

//post the donations
app.post('/donations', function(req, res) {

  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO donations SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
//get the details of donations
app.get('/donations', function (req, res) {
  connection.query('SELECT * FROM donations', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//to get all database values from donations
app.get('/donations', function (req, res) {
  connection.query('SELECT * FROM donations', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//for admin login
app.post('/login', function(req, res) {

  // Get sent data.

  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO login SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
app.get('/login', function (req, res) {
  connection.query('SELECT * FROM login', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
app.get('/login/:aname', function (req, res) {
  connection.query('SELECT * FROM login WHERE aname=?', [req.params.aname], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
app.post('/mo', function(req, res) {

  // Get sent data.

  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO mo SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
app.get('/mo/:mname', function (req, res) {
  connection.query('SELECT * FROM mo WHERE mname=?', [req.params.mname], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
//posting the information of govt funds
app.post('/fun', function(req, res) {

  // Get sent data.

  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO fun SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
//getting the information of funds
app.get('/fun', function (req, res) {
  connection.query('SELECT * FROM fun', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
app.put('/fun', function (req, res) {
  connection.query('UPDATE `fun` SET `amount`=?,`wrv`=? WHERE `uscheme`=?', [ req.body.amount,req.body.wrv,req.body.uscheme], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});