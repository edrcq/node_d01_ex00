const express = require('express')
const http = require('http')
const router = require('./routes')

function initWebServer() {

    const app = express()

    const server = http.createServer(app)

    app.disable('x-powered-by')

    // ceci est un middleware, qui converti le JSON body en req.body, objet utilisable en JS
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Bind le router sur l'url /
    app.use('/', router)

    server.listen(4021, (err) => {
        if (!err) {
            console.log('Listening on 4021')
        }
    })

    return { app, server }

}

exports.initWebServer = initWebServer