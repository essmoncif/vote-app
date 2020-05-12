import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterSchema } from 'models/voter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MssgCOSchema } from 'models/mssgCO.schema';
import { MssgDESchema } from 'models/mssgDE.schema';
import { MssgCoService } from './mssg-co.service';
import { MssgDeService } from './mssg-de.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Voter', schema: VoterSchema }]),
        MongooseModule.forFeature([{ name: 'MssgCO', schema: MssgCOSchema }]),
        MongooseModule.forFeature([{ name: 'MssgDE', schema: MssgDESchema }])
    ],
    providers: [VoterService, MssgCoService, MssgDeService],
    exports: [VoterService, MssgDeService, MssgCoService]
})
export class SharedModule {}
