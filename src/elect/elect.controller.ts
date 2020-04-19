import { Controller, Post, Body } from '@nestjs/common';
import { ElectService } from './elect.service';

@Controller('elect')
export class ElectController {
    
    constructor(private electService: ElectService){}

    @Post('add')
    async newElect(
        @Body('nom') nom: string,
        @Body('prenom') prenom: string,
        @Body('statut') statut: string
    ){
        return await this.electService.addElect(nom, prenom, statut);
    }

    @Post('vote')
    async voteOnElect(@Body('id') id: string){
        return await this.electService.voteOnElect(id);
    }
}
