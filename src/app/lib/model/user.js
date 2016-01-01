import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,

    schema = new Schema({
        username: String,
        password: String,
        networks: Mixed
    });

export default mongoose.model('User', schema);
