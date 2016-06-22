import moment from 'moment';
moment.locale('en-gb');
import events from 'events';
let EventEmitter = events.EventEmitter;
import XMPPClient from 'node-xmpp-client';

export default class XMPP {
    constructor(objNetwork) {
        this.objNetwork = objNetwork;
    }

    async getFolders() {
        return [
            {
                name: this.objNetwork.name,
                type: 'rss'
            }
        ];
    }

    getInbox() {
        // This is live only - so there will be no data to *start* with.
        return [];
    }

    async getFeed() {
        return [];
    }

    getLiveMessages() {
        let emitter = new EventEmitter(this.objNetwork);

        let client = new XmppClient({
            jid:  this.objNetwork.name + '@' + this.objNetwork.server,
            password: this.objNetwork.password
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
        // create xmpp instance and send
        return emitter;
    }
}
