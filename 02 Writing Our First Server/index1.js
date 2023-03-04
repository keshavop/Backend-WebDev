const http = require("http");
const port = 8080;

function requestHandler(req,res){
    console.log(req.url);

    res.end("<h1>Hey kiki!</h1>")
}

const server = http.createServer(requestHandler);

server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log("server is up!!");
})