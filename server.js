const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
var app = express();

const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

// app.use((req,res,next)=>{
//     console.log("Running");
//     next(); //must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging
// })
app.use((req,res,next)=>{
    var log=`${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('somefile.log',log+'\n',(err)=>
    {       if (err)
       {        console.log("some problem");   }});
       next();
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('Beginswith',(text)=>{
  var student='119';
  var teacher='110';
  var admin='101';
  if(text.startsWith(student)) return 'Welcome Student!!!';
  if(text.startsWith(teacher)) return 'Welcome Teacher!!!';
  if(text.startsWith(admin)) return 'Welcome Admin!!!!';
});
app.get('/', (req, res) => {
  res.render('Login.hbs', {
    pageTitle: 'Login Page',
    UserId: '119009'
  });
});

app.get('/profile', (req, res) => {
	res.render('Profile.hbs', {
    pageTitle: 'Profile Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
  errorMessage: 'Unable to handle request'
  });
});
//Situation specific invalid routing messages/pages
app.get('/profile/personal', (req, res) => {
  res.render('Personal.hbs', {
    pageTitle: 'Personal Page'
  });
});
app.get('/profile/transaction', (req, res) => {
  res.render('Transaction.hbs', {
    pageTitle: 'Transaction Page'
  });
});
//Whatever you'll write, it will match and print the message. If I write this at start , then alaways this message will get print no matter what you write.
app.get('*', (req, res) => {
  res.send('<h3>Invalid Route</h3>');
});

app.listen(2300, () => {
  console.log('Server is up on port 2300');
});

