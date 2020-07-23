import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatDto {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    age?: number;
    @ApiProperty()
    breed?: string;
}