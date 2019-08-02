var express=require('express');

var app=express();
app.listen(3000,()=>{
  console.log("Server Started on port No.3000");
});
app.get('/',(request,response)=>
{
  response.render("index");
});

var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended:true
}))

var con=require('./db');
app.post('/loginCheck',(request,response)=>{
  var uid=request.body.user;
  var pwd=request.body.pass;
  var sql="select * from loginCheck where userid='"+uid+"' and password='"+pwd+"'";
  con.query(sql,function(err,result){
  if(err) throw err;
  if(result.length>0)
    response.render("Home");
  else
      response.render("index.hbs",{msg:'login Fail'});
});
});

app.get('/insertdata',(request,response)=>
{
response.render("insert.hbs");
});
app.post('/insert',(request,response)=>
{
var empid=request.body.empid;
var empname=request.body.empname;
var empsalary=request.body.empsalary;

var sql="Insert into employee values('"+empid+"','"+empname+"','"+empsalary+"')";
con.query(sql,function(err,result){
  if(err)
  {
    console.log("insertion fail..");
  throw err;
}
else {
    response.render("home");
  }
});
});

app.get('/showdata',(request,response)=>
{
  var sql="select * from employee";
  con.query(sql,function(err,result)
{
  if(err) throw err;
  else
    {
      console.log(result);
      response.render("show",{'list':result});
}
});
});

app.get('/deleteEmp',(request,response)=>
{
  var eid=request.query.empid;
  var sql="delete from employee where empid='"+eid+"'";
  console.log(sql);
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else
      {
        var sql="select * from employee";
        con.query(sql,(err,result)=>
      {
        if(err) throw err;
        else
          {
            console.log(result);
            response.render('show',{'list':result,'msg':'data deleted...'});
          }

      });
      }
    });
});
