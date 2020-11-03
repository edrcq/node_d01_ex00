const { initWebServer } = require('./webserver')
const { initSocketServer } = require('./socket')

const { server } = initWebServer()
const io = initSocketServer(server)
