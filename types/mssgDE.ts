import { Document } from 'mongoose';

export interface MssgDE extends Document{
    encryptMessage: string;
    vu: boolean;
    date: Date;
}