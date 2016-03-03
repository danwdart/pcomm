import AbstractNetwork from '../lib/network/abstract';

// for now it is live but we should save later
export default async (req, res) => {
    let networks = req.session.user.networks,
        arrInbox = await AbstractNetwork.getInbox(networks);

    return res.send(arrInbox);
}

export async function folders(req, res) {
    let networks = req.session.user.networks,
        arrFolders = await AbstractNetwork.getFolders(networks);

    return res.send(arrFolders);
}
