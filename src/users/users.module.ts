import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { VerificationTokenModule } from '../verification-token/verification-token.module';

@Module({
  imports: [AuthModule, VerificationTokenModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
