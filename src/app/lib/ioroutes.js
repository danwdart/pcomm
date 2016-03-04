export default (io, XmppClient) => {
    // send stuff out...
    /*

    */

    io.on('connection', (socket) => {
        socket.emit('message', {hello:'world'});
        socket.on('message', (msg) => {
            console.log(msg);
        })
    })
}
