import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    console.log('CLIENT'+ socket.client)
//   socket.emit('news', { hello: 'world' })
})
