import * as mongoose from 'mongoose';

export const ElectSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    statut: String,
    numberVote: {
        type: Number,
        default : 0
    },
})  