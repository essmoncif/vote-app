import { Controller, Post, Body, Get, Req, Param } from '@nestjs/common';
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
    async voteOnElect(@Body('id') id: string, @Body('idVoter') idVoter : string){
        return await this.electService.voteOnElect(id, idVoter);
    }

    @Get('all')
    async getAllElect(){
        return this.electService.getAllElect();
    }

    @Get(':id')
    async getElectById(@Param('id') id :string ){
        return this.electService.getElectById(id);
    }

    
}
