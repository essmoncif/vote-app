import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Elect } from 'types/elect';
import { VoterService } from 'src/shared/voter.service';

@Injectable()
export class ElectService {

    constructor(@InjectModel('Elect') private electModel: Model<Elect>, private voterService : VoterService){}

    async addElect(nom: string, prenom: string, statut: string){
        const elect = await this.electModel.findOne({nom: nom, prenom: prenom});
        if(elect){
            throw new HttpException('Elect already exists', HttpStatus.BAD_REQUEST);
        }
        const newElect = new this.electModel({
            nom: nom,
            prenom: prenom,
            statut: statut
        });

        return await newElect.save();
    }


    async voteOnElect(id: string, idVoter: string){
        const voter = await this.voterService.getUserById(idVoter);
        if(!voter){
            throw new NotFoundException("user =>id : "+idVoter+" not found!");
        }else{
            if(voter.action){
                return {
                    "message" : "already vote",
                    "pre-action" : true
                }
            }
        }

        const elect = await this.electModel.findOne({"_id": id});
        if(!elect){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        elect.numberVote += 1;
        voter.action = true;
        const resultsaveelect = await elect.save();
        const resultsavevoter = await voter.save();
        return {
            "elect" : resultsaveelect,
            "voter" : resultsavevoter
        }
    }

    async getAllElect(){
        return await this.electModel.find({});
    }

    async getElectById(id : string){
        const elect = await this.electModel.findOne({'_id' : id});
        if(elect){
            return elect;
        }else{
            throw new NotFoundException("Any elect with this id");
        }
    }

}
