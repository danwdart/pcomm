import mongoose from 'mongoose';

export default mongoose.model(
    'Folder',
    new mongoose.Schema({
        _id: String,
        username: String,
        type: String,
        name: String,
        date: Date
    })
);
