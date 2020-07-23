import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';


import {AuthCredentialsDto} from "./DTOs/auth-credetials.dto";
import {User} from "./user.interface";
import {JwtService} from "@nestjs/jwt";
import {LoginCredentialsDto} from "./DTOs/logIn-credentials.dto";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,  private jwtService: JwtService) {}

    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { password, ...rest } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ ...rest, password: hashedPassword });

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async login(loginCredentialsDto: LoginCredentialsDto) {
        const { email, password } = loginCredentialsDto;
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.generateAccessToken(user);

        return accessToken

    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.password);
        if (valid) {
            return user;
        }
        return null;
    }

    private generateAccessToken(user: User): string {
        const token = this.jwtService.sign({
            sub: user.id,
            username: user.name,
        });
        return token;
    }
}