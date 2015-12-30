import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,

    schema = new Schema({
        username: String,
        password: String,
        networks: Object
    });

export default mongoose.model('User', schema);
