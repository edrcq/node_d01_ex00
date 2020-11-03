const http = require('http')

function requestHandler(request, response) {
    console.log(request.url, request.url.split('/'))

    response.write('Hello');
    response.end();
}

const server = http.createServer(requestHandler)

server.listen(4021, () => {
    console.log('Web server listening on http://localhost:4021')
})

