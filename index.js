const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()

app.disable('x-powered-by')

app.use(bodyParser.json())

app.use(function(req, res, next) {
    if (req.url === '/secret') {
        console.log("big secret here")
        return res.json({ yousee: 'that' })
    }
    next()
})

// Bind le router sur l'url /
app.use('/', router)

app.listen(4021, (err) => {
    if (!err) {
        console.log('Listening on 4021')
    }
})