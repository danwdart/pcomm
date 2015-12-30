export default (io) => {
    let socket = io.connect(window.location.origin + '/');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.emit('message', {hi: 'from browser'});
    });
};