export default (io) => {
    let socket = io.connect('http://localhost:3000');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.emit('message', {hi: 'from browser'});
    });
};