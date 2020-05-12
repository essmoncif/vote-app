import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MssgDE } from 'types/mssgDE';
import { Model } from 'mongoose';

@Injectable()
export class MssgDeService {

    constructor(@InjectModel('MssgDE') private mssgDE: Model<MssgDE>){}

    async setMessageToDE(mssg: string, voterId: string){
        const newmssg = new this.mssgDE({
            receiveFrom: voterId,
            encryptMessage: mssg
        });

        return await newmssg.save();
    }

    async setMessageFromCOToVerify(mssg: string, receiveFrom: string){
        const voter = await this.mssgDE.findOne({receiveFrom: receiveFrom});
        
        if(!voter){
            throw new NotFoundException("this user not yet vote");
        }
        if(voter.receiveEncryptMessageFromCO){
            throw new HttpException('This message is already exists ', HttpStatus.BAD_REQUEST);
        }
        voter.receiveEncryptMessageFromCO = mssg;
        return await voter.save();
    }

    async getMessageById(id: string){
        const mssg = await this.mssgDE.find({"_id": id});
        if(!mssg){
            throw new HttpException('Invalid message id', HttpStatus.UNAUTHORIZED);
        }
        return mssg;
    }

    async getMessagesNotYetSeen(){
        const mssgs = await this.mssgDE.find({}).where('vu').equals(false);
        return mssgs;
    }

    async getMessagesByVoterId(id : string){
        const mssgs = await this.mssgDE.find({receiveFrom: id});
        return mssgs;
    }

    async getMessagesNotYetSeenByVoterId(id :  string){
        const mssgs = await this.mssgDE.find({receiveFrom: id}).where('vu').equals(false);
        return mssgs;
    }

    async getAllMessage(){
        const allmssg = await this.mssgDE.find({});
        return allmssg;
    }
    
    async setMessageAsVerified(id : string){
        const message = await this.mssgDE.findOne({"_id" : id});

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
