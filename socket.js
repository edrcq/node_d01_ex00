const SocketIO = require('socket.io')

function initSocketServer(server) {

    const io = SocketIO(server)

    io.on('connection', (client_socket) => {

        console.log('client socket connected', client_socket.id)

        client_socket.on('login', data => {
            console.log('client try to login', data)
            client_socket.broadcast.emit('other_login', data)
            client_socket.emit('login', { success: true })
            console.log(data.pseudo)
            client_socket.pseudo = data.pseudo
        })


    })

    return io
}

exports.initSocketServer = initSocketServer
