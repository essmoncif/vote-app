import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MssgCO } from 'types/mssgCO';

@Injectable()
export class MssgCoService {

    constructor(@InjectModel('MssgCO') private mssgCO: Model<MssgCO> ){}


    async setMessageToCO(mssg: string, voterId: string){
        const newmssg = new this.mssgCO({
            receiveFrom: voterId,
            encryptMessage: mssg
        });
        return await newmssg.save();
    }

    async getMessageById(id : string){
        const mssg = await this.mssgCO.find({'_id': id});
        if(!mssg){
            throw new HttpException('Invalid message id', HttpStatus.UNAUTHORIZED);
        }
        return mssg;
    }

    async getMessagesByVoterId(id : string){
        const mssgs = await this.mssgCO.find({receiveFrom: id});
        return mssgs;
    }

    async getMessagesNotYetSeenByVoterId(id :  string){
        const mssgs = await this.mssgCO.find({receiveFrom: id}).where('vu').equals(false);
        return mssgs;
    }

    async getMessagesNotYetSeen(){
        const mssgs = await this.mssgCO.find({}).where('vu').equals(false);
        return mssgs;
    }

    async getAllMessage(){
        const allmssg = await this.mssgCO.find({});
        return allmssg;
    }

    async setMessageAsVu(id : string){
        const message = await this.mssgCO.findOne({"_id" : id});
        
        if(message){
            if(!message.vu){

                message.vu = true ;

                const res = await message.save();

                return res;
            }else{
                return {
                    message : "this message is already verified",
                }
            }
        }else{
            throw new NotFoundException("Any message with this ID");
        }
    }

}
