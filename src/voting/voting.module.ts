import { Module } from '@nestjs/common';
import { VotingController } from './voting.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [VotingController],
  imports: [SharedModule]
})
export class VotingModule {}
