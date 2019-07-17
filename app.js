const express = require('express');
const app = express();
var port = process.env.PORT||4040;

app.set('view engine' , 'pug');

app.use('/static', express.static('public'));


app.get('/',(req , res)=>{
    res.status(200);
    res.render('index');
});

app.get('/question',(req , res)=>{
    res.status(200);
    res.render('question');
});


app.listen(port,()=>{
    console.log("Express server running on port "+port);
});