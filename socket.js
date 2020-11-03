const SocketIO = require('socket.io')

function initSocketServer(server) {

    const io = SocketIO(server)

    io.on('connection', (client_socket) => {

        console.log('client socket connected', client_socket.id)

        client_socket.on('login', data => {
            console.log('client try to login', data)
            client_socket.broadcast.emit('other_login', data)
            client_socket.emit('login', { success: true })
        })

        client_socket.on('message', data => {
            console.log('msg, ', client_socket.id, ': ', data)
            const datas = {id: client_socket.id, message: data}
            client_socket.broadcast.emit('other_message', datas)
        })

        client_socket.on('messageTo', data => {
            //socket.emit('messageTo', {to: 'jpHJ-2kD6d1u7URjAAAE', message:'hello friends!'});
            console.log('msg, ', client_socket.id, ' to ', data.to, ': ', data.message)
            const datas = {from: client_socket.id, message: data.message}
            io.to(data.to).emit('messageFrom', datas);
        })

    })

    return io
}

exports.initSocketServer = initSocketServer