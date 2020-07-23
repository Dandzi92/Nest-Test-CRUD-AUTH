import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import {AuthService} from "./auth.service";
import { AuthCredentialsDto } from './DTOs/auth-credetials.dto';
import {LoginCredentialsDto} from "./DTOs/logIn-credentials.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Cat} from "../cats/cat.interface";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/register')
    @ApiResponse({
        status: 201,
        description: 'User registered',
    })
    @ApiOperation({ summary: 'Create new User' })
    async register(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        return await this.authService.register(authCredentialsDto);
    }
    @Post('login')
    @ApiResponse({
        status: 201,
        description: 'User loginned',
    })
    @ApiOperation({ summary: 'Login' })
    async signIn(@Body() loginCredentialsDto: LoginCredentialsDto) {
        return this.authService.login(loginCredentialsDto);
    }
}
