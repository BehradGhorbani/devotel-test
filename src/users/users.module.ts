import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'process';
import { VerificationTokenModule } from '../verification-token/verification-token.module';

@Module({
  imports: [
    AuthModule,
    VerificationTokenModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}
