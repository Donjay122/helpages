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

////// 404
app.use((req , res , next)=>{
    var err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err , req , res , next)=>{
    if(err.status === 404){
        res.render('error');
    }else{
        err.status = 500;
        res.json(err);
    }
})


app.listen(port,()=>{
    console.log("Express server running on port "+port);
});