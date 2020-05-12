import * as mongoose from 'mongoose';

export const MssgDESchema = new mongoose.Schema({
    receiveFrom: String,
    encryptMessage: String,
    receiveEncryptMessageFromCO: String,
    vu: {
        type: Boolean,
        default: false
    },
    date : {
        type: Date,
        default : Date.now()
    }
});