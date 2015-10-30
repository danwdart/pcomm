export default (io, XmppClient) => {
    console.log('Attempting to connect to XMPP');
    /*
    let client = new XmppClient({
        jid:  '',//,
        password: ''//
    });

    client.on('online', () => {
        console.log('online');
        client.send(
            new XmppClient.Stanza('presence', {})
            .c('show')
            .t('chat')
            .up()
            .c('status')
            .t('using pComm')
        );
    });

    client.on('stanza', (stanza) => {
        if (stanza.is('presence'))
            console.log(stanza.attrs.from+ ' is online');
        if (stanza.is('message') && 'chat' === stanza.attrs.type) {
            console.log(stanza);
            //let reply = new XmppClient.Stanza(
            //    'message',
            //    {
            //        to: stanza.attrs.from,
            //        from: stanza.attrs.to,
            //        type: 'chat'
            //    }
            //)
            //    .c('body')
            //    .t('ello!');
//
            //console.log('Sending response: ' + reply.root().toString());
            //client.send(reply);
        }
    });

    client.on('error', (e) => {
        console.error(e);
    });
    */

    io.on('connection', (socket) => {
        socket.emit('message', {hello:'world'});
        socket.on('message', (msg) => {
            console.log(msg);
        })
    })
}