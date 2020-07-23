import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Cat extends Document {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly age: number;
    @ApiProperty()
    readonly breed: string;
}