import mongoose from 'mongoose';

export default mongoose.model(
    'Feed',
    new mongoose.Schema({
        _id: String,
        username: String,
        network: String,
        networktype: String,
        subject: String,
        message: String,
        date: Date
    })
);
