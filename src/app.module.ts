import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { ElectModule } from './elect/elect.module';
import { VotingModule } from './voting/voting.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://moncef:Q8A7SumFuJvdCCAx@cluster0-8kyzd.mongodb.net/voteapp?retryWrites=true&w=majority"), SharedModule, AuthModule, ElectModule, VotingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
