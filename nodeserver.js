const http = require('http')
const fs = require("fs")

function handle(req, res) {
    console.log(req.url)
    let body = "<h1>404 Sorry!</h1>"
    if(req.url === "/index.html"){
        body = fs.readFileSync("index.html")
    } else if(req.url == "/today") {
        let dt = new Date(Date.now())
        body = '<h1 style="color: green;">'+ dt.toString() +'</h1>'
    }

    res
        .writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/html',
        })
    res.write(body)
    res.end()
}

const server = http.createServer(handle)

server.listen(3000)


