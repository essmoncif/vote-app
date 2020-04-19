import {Document} from 'mongoose';

export interface Voter extends Document{
    nom: string;
    prenom: string;
    dateNai: Date;
    CO: boolean;
    DE: boolean;
    action: boolean;
    readonly password: string;
    readonly email: string; 
}