export default (io, XmppClient) => {
    io.on('connection', (socket) => {
        socket.emit('message', {hello:'world'});
        socket.on('message', (msg) => {
            console.log(msg);
        })
    })
}