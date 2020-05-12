import { Module } from '@nestjs/common';
import { ElectService } from './elect.service';
import { ElectSchema } from 'models/elect.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectController } from './elect.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ElectController],
  imports: [MongooseModule.forFeature([{ name: 'Elect', schema: ElectSchema }]), SharedModule],
  providers: [ElectService]
})
export class ElectModule {}
