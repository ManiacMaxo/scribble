const app = require('express')()
const cors = require('cors')
const { v4 } = require('uuid')
app.use(cors())

const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

app.use('/find', (req, res) => {
    console.log('sending lobby')
    return res.send('123')
})

io.on('connection', (socket) => {
    // io.emit('userJoin', ['batman', 'superman', 'aquaman'])

    socket.emit('id', v4())

    console.log('user connected')
    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', { ...message, id: v4() })
    })

    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data))

    socket.on('disconnect', () => {
        // io.emit('userLeave', ['batman', 'superman'])
        console.log('user disconnected')
    })
})

httpServer.listen(5000, () => {
    console.log('listening on 5000')
})
