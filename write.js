var fs=require('fs');
fs.writeFile('hello.txt','Hello Node JS',function(err){
  if(err) throw err;
  console.log("Data Written Successfully");
});
