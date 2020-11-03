const SocketIO = require('socket.io')
const store = require('./store')

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
            store.connectedUsers[data.pseudo] = client_socket.id
            console.log(store.connectedUsers)
        })

        client_socket.on('message', data => {
            console.log('msg, ', client_socket.pseudo, ': ', data)
            const datas = {pseudo: client_socket.pseudo, message: data}
            client_socket.broadcast.emit('other_message', datas)
        })

        client_socket.on('messageTo', data => {
            const receiver_id = store.connectedUsers[data.to]
            console.log(receiver_id)
            //socket.emit('messageTo', {to: 'jpHJ-2kD6d1u7URjAAAE', message:'hello friends!'});
            console.log('msg, ', client_socket.pseudo, ' to ', data.to, ': ', data.message)
            const datas = {from: client_socket.pseudo, message: data.message}
            io.to(receiver_id).emit('messageFrom', datas);
        })

    })

    return io
}

exports.initSocketServer = initSocketServer
