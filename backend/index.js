const { csvsql, getsql, getUser } = require('./ManhourListSql');
const express = require('express');
// パッケージを読み込み
const mysql = require('mysql');
const ssh = require('tunnel-ssh');
const fs = require('fs');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// 追記
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({extended: true}));

// // 経由するサーバに SSH するための情報。無論適宜変える事
// const sshParam = {
//   username: 'ec2-user',
//   host: '54.250.143.215',
//   port: 22,
//   privateKey: fs.readFileSync('/home/smurakami/morisawa-tokyo-dev/manhour-prototype/backend/manhour_plottype_ec2_keypair.pem'),
//   dstPort: 3306,
//   localhost: '127.0.0.1',
//   localPort: 3336
// };

// // mysql サーバに接続するための情報。無論適宜変える事
// const mysqlParam = {
//     // host: process.env.HOST,
//     // user: process.env.DBUSER,
//     // password: process.env.DBPASSWORD,
//     // database: process.env.DATABASE
//     host     : "manhour-plottype-mysql.ceu9ml5jdncv.ap-northeast-1.rds.amazonaws.com",//適時変更
//     user     : "manhour_user",//適時変更
//     password : "mrsw1924",//適時変更
//     port     : "3306",//適時変更
//     database : "manhourdb"//適時変更
// };

// const connectToDb = (connection) => {
//   return new Promise((resolve, reject)=> {
//     connection.connect((dbConnectErr)=>{
//       if(dbConnectErr) {
//         console.error('DB への接続に失敗したよ');
//         reject(dbConnectErr);
//       } else {
//         console.log(`DB に接続できた-よ スレッド ID は ${connection.threadId}`);
//         resolve(connection);
//       }
//     });
//   });
// };

// const disconnectFromDb = (connection) => {
//   return new Promise((resolve, reject)=> {
//     connection.end((dbDisconnectErr)=> {
//       if(dbDisconnectErr) {
//         console.error('DB との切断に失敗したよ');
//         reject(dbDisconnectErr);
//       } else {
//         console.log('DB と切断したよ');
//         resolve(connection);
//       }
//     });
//   });
// };
 
// const requestQuery = (connection, sql) => {
//   return new Promise((resolve, reject)=> {
//     connection.query(sql, (requestErr, results, fields)=> {
//       if(requestErr) {
//         console.error(`DB へのリクエスト ${sql} が失敗したよ`);
//         reject(requestErr);
//       } else {
//         resolve({
//           results: results,
//           fields: fields
//         });
//       }
//     });
//   });
// };

// const sshTunnel = ssh(sshParam, async (sshErr, tunnel)=> {
//   if(sshErr) {
//     throw sshErr;
//   }
//   const connection = mysql.createConnection(mysqlParam);
//   connectToDb(connection);

//   /* 以下で DB の処理とかをがちゃがちゃ */
//   const queryResult = requestQuery(connection, 'select * from m_user;');
//   console.log(queryResult);

//     /* 終わったら切断する */
//     disconnectFromDb(connection);
//     sshTunnel.close();

//   });


// // sshトンネルを開始
// ssh({
//   //SSHに関する情報
//   username: "ec2-user",//適時変更
//   port: "22",//適時変更
//   host: "54.250.143.215",//適時変更
//   privateKey: fs.readFileSync("/home/smurakami/morisawa-tokyo-dev/manhour-prototype/backend/manhour_plottype_ec2_keypair.pem"),//適時変更
//   // keepaliveInterval: 60000,
//   // keepAlive: true,
//   dstPort: "3306",//適時変更
//   dstHost: "127.0.0.1",
//   // dstHost: "54.250.143.215",
//   // // dstHost: "manhour-plottype-mysql.ceu9ml5jdncv.ap-northeast-1.rds.amazonaws.com",
//   // // dstHost: "192.168.1.240",
//   //ローカルPCに関する情報
//   // readyTimeout: 5000,
//   localHost: "127.0.0.1",//適時変更
//   localPort: "3336"//適時変更
  
// }, function (errssh) {
//   if (errssh) {
//       console.log(errssh);
//       process.exit();
//   }
//   const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.DBUSER,
//     password: process.env.DBPASSWORD,
//     database: process.env.DATABASE
//   });

//   // // mysqlに接続
//   // let connection = mysql.createConnection({
//   //     host     : "manhour-plottype-mysql.ceu9ml5jdncv.ap-northeast-1.rds.amazonaws.com",//適時変更
//   //     user     : "manhour_user",//適時変更
//   //     password : "mrsw1924",//適時変更
//   //     port     : "3306",//適時変更
//   //     database : "manhourdb"//適時変更
//   // });

//   // connection.connect(err =>{
//   //   if(err)
//   //    console.log(err);
//   //   else
//   //     console.log('connected');
//   // });

//   const sql = `SELECT id, department_name FROM m_department ORDER BY id;`

//   connection.query(
//     sql,
//     function(err, results, fields) {
//       if(err) {
//         console.log("接続終了(異常)");
//         console.log(err);
//           // throw err;
//       }
//       // console.log(results);
//       // res.send(results);
//     }
//   );

//   // mysqlから切断
//   connection.end();

// });


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
        // console.log(results);
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
        // console.log(results);
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

  app.post("/userinfo", (req, res) => {
    const searchUser = `%${req.body.search}%`
    connection.query(
      getUser,
      [searchUser],
      function(err, results, fields) {
        if(err) {
          console.log("接続終了(異常)");
          throw err;
        }
        res.send(results);
        console.log(results);
      }
    );
  });

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

