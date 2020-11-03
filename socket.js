const SocketIO = require('socket.io')

function initSocketServer(server) {

    const io = SocketIO(server)

    const clientsbyId = {}
    let count = 0;
    let connecteds = 0;
    const connected_clients = []

    function searchClientName(name) {
        return connected_clients.find(cli => cli.data.pseudo === name)
    }

    io.on('connection', (client_socket) => {
        client_socket.data = {}
        clientsbyId[client_socket.id] = client_socket
        count++

        console.log('client socket connected', client_socket.id)

        client_socket.on('login', data => {
            connecteds++
            connected_clients.push(client_socket)
            console.log('client try to login', data)
            client_socket.broadcast.emit('other_login', { pseudo: data.pseudo, count: connecteds })
            client_socket.data.pseudo = data.pseudo
            client_socket.data.connected = true
            client_socket.emit('login', { success: true, pseudo: data.pseudo, count: connecteds })
        })

        client_socket.on('messageTo', data => {
            const { to, message } = data
            const toClient = searchClientName(to)
            if (toClient) {
                io.to(toClient.id).emit('msgp', { message, from: client_socket.data.pseudo })
            }
        })

        client_socket.on('send_msg', data => {
            const msg = {
                text: data.text,
                pseudo: client_socket.data.pseudo
            }
            io.emit('new_msg', msg)
        })

        client_socket.on('disconnect', () => {
            if (client_socket.data.connected) {
                connecteds--
            }
            delete clientsbyId[client_socket.id]
            count--
        })


    })

    return io
}

exports.initSocketServer = initSocketServer