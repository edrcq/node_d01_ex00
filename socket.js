const SocketIO = require('socket.io')

function initSocketServer(server) {

    const io = SocketIO(server)

    io.on('connection', (client_socket) => {

        console.log('client socket connected')

    })

    return io
}

exports.initSocketServer = initSocketServer