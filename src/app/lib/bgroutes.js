import AbstractNetwork from './network/abstract';
import User from './model/user';
import Message from './model/message';
import Feed from './model/feed';
import Folder from './model/folder';
import md5 from './md5';

let importall = async () => {
    try {
    let users = await User.find();

    users.forEach(async (user) => {
        try {
        console.log('Importing for', user.username);

        console.log('Importing feeds');
        let feeds = await AbstractNetwork.getFeeds(user.networks);

        console.log('Saving feeds');
        for (let feed of feeds) {
            let modelFeed = new Feed();

            Object.assign(modelFeed, feed);

            modelFeed.username = user.username;
            modelFeed._id = md5(String(feed.id));

            console.log('Saving feed', feed.id);
            await modelFeed.save();
            console.log('Saved feed', feed.id);
        }
        console.log('Saved feeds')

        console.log('Importing inbox');
        let inbox = await AbstractNetwork.getInbox(user.networks);

        console.log('Saving inbox');
        for (let message of inbox) {
            let modelMessage = new Message();

            Object.assign(modelMessage, message);

            modelMessage.username = user.username;
            modelMessage._id = md5(String(message.id));

            console.log('Saving message', message.id);
            await modelMessage.save();
            console.log('Saved message', message.id);
        }
        console.log('Saved inbox');

        console.log('Importing folders')
        let folders = await await AbstractNetwork.getFolders(user.networks);

        console.log('Saving folders');
        for (let folder of folders) {
            let modelFolder = new Folder();

            Object.assign(modelFolder, folder);

            modelFolder.username = user.username;
            modelFolder._id = md5(String(user.name + folder.name));

            console.log('Saving folder', folder.name);
            await modelFolder.save();
            console.log('Saved folder', folder.name);
        }
        console.log('Saved folders');
    } catch (err) {
        console.log('arse', err, err.stack);
    }
    })
}
catch (err) { console.log('bum', err)}
};

export default async () => {
    // Import network mail on a timed basis
    console.log('Importing all');

    setTimeout(importall, 5*60*1000);

    await importall();

    // Set up listeners for push events and push to browser and db
};
