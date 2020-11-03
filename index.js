const express = require('express')
const router = require('./routes')

const app = express()

app.disable('x-powered-by')

// ceci est un middleware, qui converti le JSON body en req.body, objet utilisable en JS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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