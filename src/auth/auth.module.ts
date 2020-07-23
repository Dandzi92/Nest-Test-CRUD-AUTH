import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.schema";
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt-auth.strategy";

@Module({
  imports:[ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),  PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '86400s' },
    }),],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
