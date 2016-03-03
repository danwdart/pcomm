import Inbox from 'simple-imap-inbox';
import moment from 'moment';
moment.locale('en-gb');

export default class Email {
    constructor(objNetwork) {
        this.objNetwork = objNetwork;
    }

    async getInbox() {
        try {
            let inbox = new Inbox({
                user: this.objNetwork.name,
                password: this.objNetwork.password,
                host: this.objNetwork.imap,
                port: 993,
                tls: true
            });
            await inbox.connect(true);
            let numMessages = inbox.inbox.messages.total;
            console.log('Downloading', numMessages, 'messages');
            let messages = await inbox.fetch(numMessages);
            return messages.map((message)=>({
                from: message.headers.from[0],
                subject: message.headers.subject[0],
                date: moment(new Date(message.headers.date[0])).format('lll'),
                id: message.attributes.uid
            }));
        } catch (err) {
            console.log('caught here', err);
            return [];
        }
    }

    async getFolders() {
        return [{
            name: this.objNetwork.name,
            type: this.objNetwork.type
        }]
    }

    async getFeed() {
        return [];
    }
}
