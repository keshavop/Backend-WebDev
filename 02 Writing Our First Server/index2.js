const http = require("http");
const port = 8000;
const fs = require("fs");

function requestHandler(req, res) {
    console.log(req.url);

    let filePath;

    switch (req.url) {
        case '/':
            filePath = "./index.html"
            break;
        case '/profile':
            filePath = "./profile.html"
            break;
        case '/about':
            filePath = "./about.html"
            break;
        default:
            filePath = "./404.html"
    }

    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.log("error", err);
            return res.end("<h1>Error!</h1>")
        }
        return res.end(data);
    })
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("server is up");
})