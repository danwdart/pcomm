import mongoose from 'mongoose';

let schema = new mongoose.Schema({
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
});

schema.method('saveOverwrite', function(cb) {
    return this.constructor.update({_id: this._id}, {$set: this.toObject()}, {$upsert: true});
});

export default mongoose.model('Message', schema);
