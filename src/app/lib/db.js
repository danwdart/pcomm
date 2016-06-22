import mongoose from 'mongoose';
export default (dbhost) =>
    mongoose.connect('mongodb://'+dbhost+'/pcomm');
