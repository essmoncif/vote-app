import * as mongoose from 'mongoose';

export const MssgCOSchema = new mongoose.Schema({
    receiveFrom: String,
    encryptMessage: String,
    vu: {
        type: Boolean,
        default: false
    },
    date : {
        type: Date,
        default : Date.now()
    }
});