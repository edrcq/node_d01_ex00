const express = require('express')
const http = require('http')
const router = require('./routes')

const port = process.env.PORT || 4021

function initWebServer() {

    const app = express()

    const server = http.createServer(app)

    app.disable('x-powered-by')

    // ceci est un middleware, qui converti le JSON body en req.body, objet utilisable en JS
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/front', express.static('html'))
    // Bind le router sur l'url /
    app.use('/', router)

    server.listen(port, (err) => {
        if (!err) {
            console.log('Listening on ' + port)
        }
    })

    return { app, server }

}

exports.initWebServer = initWebServer