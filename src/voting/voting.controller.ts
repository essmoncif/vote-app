import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MssgCoService } from 'src/shared/mssg-co.service';
import { MssgDeService } from 'src/shared/mssg-de.service';

@Controller('voting')
export class VotingController {

    constructor(private mssgCoService: MssgCoService, private mssgDeService: MssgDeService){}

    @Post('co')
    async voteMessageToCo(@Body('encryptMessage') mssg : string, @Body('receiveFrom')voterId: string ){
        return await this.mssgCoService.setMessageToCO(mssg, voterId);
    }

    @Post('de')
    async voteMessageToDe(@Body('encryptMessage') mssg : string, @Body('receiveFrom')voterId: string){
        return await this.mssgDeService.setMessageToDE(mssg, voterId);
    }

    @Post('notifyde')
    async notifyDEToVerify(@Body('receiveEncryptMessageFromCO') mssg : string, @Body('receiveFrom') voterId: string){
        return await this.mssgDeService.setMessageFromCOToVerify(mssg, voterId);
    }

    @Get('co/:id')
    async getMessageCoById(@Param('id') id : string){
        return await this.mssgCoService.getMessageById(id);
    }

    @Get('co/voter/:id')
    async getMessageCoByVoterId(@Param('id') id: string){
        return await this.mssgCoService.getMessagesByVoterId(id);
    }

    @Get('co')
    async getAllMessageCo(){
        return await this.mssgCoService.getAllMessage();
    }

    @Get('de')
    async getAllMessageDe(){
        return await this.mssgDeService.getAllMessage();
    }

    @Post('co/verify')
    async setMessageVu(@Body('idMessage') idMessage : string){
        return await this.mssgCoService.setMessageAsVu(idMessage);
    }

    @Post('de/verify')
    async setMessageDeAsVerified(@Body('idMessage') idMessage : string){
        return await this.mssgDeService.setMessageAsVerified(idMessage);
    }


}
