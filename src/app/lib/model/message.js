import mongoose from 'mongoose';

export default mongoose.model(
    'Message',
    new mongoose.Schema({
        _id: String,
        username: String,
        network: String,
        networktype: String,
        from: String,
        to: String,
        subject: String,
        date: Date,
        headers: [{key: String, value: String}],
        message: String
    })
);