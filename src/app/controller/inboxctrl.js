import Message from '../lib/model/message';
import Folder from '../lib/model/folder';

export default async (req, res) => {
    let arrInbox = await Message.find({username: req.session.user.username});

    return res.send(arrInbox);
}

export async function folders(req, res) {
    let arrFolders = await Folder.find({username: req.session.user.username});

    return res.send(arrFolders);
}
