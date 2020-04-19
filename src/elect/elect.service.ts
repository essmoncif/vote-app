import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Elect } from 'types/elect';

@Injectable()
export class ElectService {

    constructor(@InjectModel('Elect') private electModel: Model<Elect>){}

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


    async voteOnElect(id: string){
        const elect = await this.electModel.findOne({"_id": id});
        if(!elect){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        elect.numberVote += 1;
        return await elect.save();
    }

}
