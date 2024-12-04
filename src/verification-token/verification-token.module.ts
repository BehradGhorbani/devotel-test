import { Module } from '@nestjs/common';
import { VerificationTokenService } from './verification-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationTokenEntity } from './entities/verification-token.entity';
import { VerificationTokenController } from './verification-token.controller';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationTokenEntity, UserEntity]),

  ],
  controllers: [VerificationTokenController],
  providers: [VerificationTokenService],
  exports: [VerificationTokenService],
})
export class VerificationTokenModule {
}
