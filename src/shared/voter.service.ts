import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Voter } from "types/voter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VoterService{

    constructor(@InjectModel('Voter') private voterModel: Model<Voter>){}
 

    async addUser(nom: string, prenom: string, dateNai: Date, email: string, password: string, job: string){
        const user = await this.voterModel.findOne({email});
        if(user){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        let CO : boolean;
        let DE : boolean;
        if(job == 'user'){
            CO = false;
            DE = false;
        }else{
            if(job == 'co'){
                CO = true;
            }else{
                if(job == 'de'){
                    DE = true;
                }
            }
        }

        const newUser = new this.voterModel({
            nom : nom,
            prenom : prenom,
            dateNai: dateNai,
            email: email,
            password : password,
            action: false,
            CO : CO,
            DE : DE
        })

        const result = await newUser.save();
        return result;
    }

    async login(email: string, password: string){
        const user = await this.voterModel.findOne({email});
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }


        if(await bcrypt.compare(password, user.password)){
            if (email == user.email){
                
                return user;
            }   
        }
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    async getUserById(id: string){
        const user = await this.voterModel.findOne({'_id' : id});
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}