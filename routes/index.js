var express = require('express');
var router = express.Router();

const {spawn} = require('child_process');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Age Calculator with Nodejs and Python',port:process.env.PORT||3000});
});

router.get('/model',(req,res,next)=>
{
    res.statusCode= 200;
    res.render('age');
});

router.post('/user',(req,res)=>
{
  const DOB = new Date(req.body.date)
  const person = {
    fname : req.body.fname,
    lname:req.body.lname,
    year :  DOB.getFullYear(),
    month : DOB.getMonth()+1,
    date: DOB.getDate()
  }

  const PythonOut = spawn('python',['./Python/codespace.py',JSON.stringify(person)])

  PythonOut.stdout.on('data',(data)=>
  {
    res.statusCode =200;
    res.render('result',{fname:person.fname, lname:person.lname,age:data})
  })

  PythonOut.stderr.on('data',(data)=>{
     console.log(`Error : ${data}`);
     res.redirect('/model')
  })

  PythonOut.on('close',(data)=>
  {
    console.log(`code number: ${data}`);
  })

  // res.setHeader('Content-Type','application/json')
  // res.statusCode=200
  // res.send(person);
})

module.exports = router;
