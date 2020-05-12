import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const VoterSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    dateNai: Date,
    CO : {
        type: Boolean,
        default: false
    },
    DE : {
        type: Boolean,
        default: false
    },
    action:{
        type: Boolean,
        default: false,
    },
    password: String,
    email: String, 
})

VoterSchema.pre('save', async function(next: mongoose.HookNextFunction){
    try{
        if(!this.isModified('password')){
            return next();
        }

        const hash = await bcrypt.hash(this['password'], 10);
        this['password'] = hash;
        return next();
    }catch(err){
        return next(err);
    }
}) 