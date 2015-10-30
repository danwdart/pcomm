import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,

    schema = new Schema({
        _id: ObjectId,
        username: String,
        password: String
    });

export default mongoose.model('User', schema);
