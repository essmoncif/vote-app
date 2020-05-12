import {Document} from 'mongoose';

export interface Elect extends Document{
    nom: string;
    prenom: string;
    statut: string;
    numberVote: number;
}


