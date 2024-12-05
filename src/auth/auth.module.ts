import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseAdmin } from "./firebase.setup";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: parseInt(config.get('JWT_EXPIRES_AT')) * 1000,
        },
        verifyOptions: {
          ignoreExpiration: false,
        }
      })
    }),
  ],

  providers: [AuthService, FirebaseAdmin],
  exports: [AuthService, FirebaseAdmin],
})
export class AuthModule {
}
