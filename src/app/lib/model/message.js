import mongoose from 'mongoose';

export default mongoose.model(
    'Message',
    new mongoose.Schema({
        username: String,
        network: String,
        networktype: String,
        from: String,
        to: String,
        subject: String,
        headers: [{key: String, value: String}],
        message: String
    })
);
