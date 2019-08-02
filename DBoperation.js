var con=require('./db');
var sql="insert into employee values(1002,'Amit',15000.00)";
con.query(sql,function(err,result){
  if(err) throw err;
  else
  console.log("Data Inserted...");
});
