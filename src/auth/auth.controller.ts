import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import {AuthService} from "./auth.service";
import { AuthCredentialsDto } from './DTOs/auth-credetials.dto';
import {LoginCredentialsDto} from "./DTOs/logIn-credentials.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/register')
    async register(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        return await this.authService.register(authCredentialsDto);
    }
    @Post('login')
    async signIn(@Body() loginCredentialsDto: LoginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }
}
