import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterSchema } from 'models/voter.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Voter', schema: VoterSchema }])],
    providers: [VoterService],
    exports: [VoterService]
})
export class SharedModule {}
