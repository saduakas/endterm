const http = require('http');
const files = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    files.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type":"text/plain"})
            res.end("500 - Internal error with a response code 500")
        }
        else {
            res.writeHead(responseCode, {"Content-Type": contentType})
            res.end(data)
        }
    })
}

http.createServer(function(req, res) {

    if(/\.css$/.test(req.url)){
        return serveStaticFile(res, req.url, 'text/css');
    }

    if(/\.js$/.test(req.url)){
        return serveStaticFile(res, req.url, 'application/javascript');
    }

    if(/\.jpg$/.test(req.url)){
        return serveStaticFile(res, req.url, 'img/jpeg');
    }

    var path = req.url.replace(/\/?(?:\?.*)?$/ ,"").toLowerCase()
    switch(path) {
        case "":
            serveStaticFile(res, "/index.html", "text/html")
            break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html")
            break;
        case "/img/about":
            serveStaticFile(res, "/img/about.jpg", "image/jpeg")
            break;
        case "img/cry":
            serveStaticFile(res, "/img/cry.jpg", "image/jpeg")
            break;
        case "/img/welcome":
            serveStaticFile(res, "/img/welcome.jpg", "image/jpeg")
            break;
        case "/img/gallery/graduation":
            serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg")
            break;
        case "/img/gallery/study":
            serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg")
            break;
        case "/video/students/memes":
            serveStaticFile(res, "/video/students/memes.mp4", "video/mp4")
            break;
        default:
            serveStaticFile(res, "/error.html", "text/html", 404)
            break;
    }




}).listen(3000);

console.log("Server is running on localhost:3000");