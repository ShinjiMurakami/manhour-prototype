const { csvsql, getsql } = require('./ManhourListSql')
const express = require('express')
const mysql = require('mysql')
const app = express()
require('dotenv').config();
const port = process.env.PORT

// 追記
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({extended: true}));

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE
});


app.post("/csvexport", (req, res) => {
  const allSearch = `%${req.body.search}%`
  connection.query(
  csvsql,
  [allSearch, allSearch, allSearch, allSearch, allSearch, allSearch, allSearch, allSearch],
  function(err, results, fields) {
      if(err) {
      console.log("接続終了(異常)");
      throw err;
      }
      res.send(results);
  }
  );
});

app.post("/getDepartment", (req, res) => {
  const sql = `SELECT id, department_name FROM m_department ORDER BY id;`

  connection.query(
    sql,
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log(results);
      res.send(results);
    }
  );
});

app.post("/add", (req, res) => {
  const sql = `INSERT INTO m_user (user_name, department_id) values (?, ?);`

  const user_name = req.body.user_name
  const depertment_id = req.body.depertment_id
  connection.query(
    sql,
    [user_name, depertment_id],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log(results);
      // res.send(results);
    }
  );
});

app.post("/api", (req, res) => {
  const allSearch = `%${req.body.search}%`
  connection.query(
    getsql,
    [allSearch, allSearch, allSearch, allSearch, allSearch, allSearch, allSearch, allSearch],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});




