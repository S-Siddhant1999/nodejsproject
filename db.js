var mysql=require('mysql');

var con=mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'root',
  database:'nodedb'
});

con.connect(function(err){
  if(err) throw err;
  else
    console.log("Database Connected Successfully...");
  });
module.exports=con;
