import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  exports: []

})
export class AuthModule {}
