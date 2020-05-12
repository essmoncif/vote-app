import { Document } from 'mongoose';

export interface MssgCO extends Document{
    encryptMessage: string;
    vu : boolean;
    date : Date;
}