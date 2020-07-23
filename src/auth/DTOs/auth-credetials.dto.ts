import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    surname: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}