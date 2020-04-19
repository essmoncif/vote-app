import { Controller, Post, Body } from '@nestjs/common';
import { VoterService } from 'src/shared/voter.service';

@Controller('auth')
export class AuthController {

    constructor(private voterService: VoterService){}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string 
    ){
        return await this.voterService.login(email, password);
    }

    @Post('register')
    async register(
        @Body('nom') nom: string,
        @Body('prenom') prenom: string,
        @Body('password') password: string,
        @Body('dateNai') dateNai: Date,
        @Body('email') email: string,
        @Body('job') job: string
    ){
        return await this.voterService.addUser(nom, prenom, dateNai, email, password, job);
    }
}
 