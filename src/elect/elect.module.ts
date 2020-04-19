import { Module } from '@nestjs/common';
import { ElectService } from './elect.service';
import { ElectSchema } from 'models/elect.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectController } from './elect.controller';

@Module({
  controllers: [ElectController],
  imports: [MongooseModule.forFeature([{ name: 'Elect', schema: ElectSchema }])],
  providers: [ElectService]
})
export class ElectModule {}
