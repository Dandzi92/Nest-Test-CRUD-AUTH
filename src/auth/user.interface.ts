import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class User extends Document {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly surname: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
}