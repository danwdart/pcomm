import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    _id: String,
    username: String,
    network: String,
    networktype: String,
    subject: String,
    message: String,
    date: Date
});

schema.method('saveOverwrite', function(cb) {
    return this.constructor.update({_id: this._id}, {$set: this.toObject()}, {$upsert: true});
});

export default mongoose.model('Feed', schema);
