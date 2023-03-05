const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded());
// app.use(express.static('assets'));
// app.get('/',function(req,res){
//     res.send('<h1>cool, it running</h1>');
// })

app.get('/', function(req, res){
    return res.render('home',{
        title: "home view in ejs"
    });
})

app.listen(port,function(err){
    if(err){
        console.log("error in server",err);
    }
    console.log("it's up and running",port);
})