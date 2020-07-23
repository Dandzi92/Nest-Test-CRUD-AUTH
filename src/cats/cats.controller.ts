import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags, ApiOperation, ApiBearerAuth} from "@nestjs/swagger";
import {CreateCatDto} from "./DTOs/create-cat.dto";
import {CatsService} from "./cats.service";
import { Cat } from './cat.interface';
import {UpdateCatDto} from "./DTOs/update-cat.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";


@ApiBearerAuth()
@ApiTags("Cats")
@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({
        status: 200,
        isArray: true,
        description: 'The found cats',
        type: Cat,
    })
    @ApiOperation({ summary: 'Fetch all cats' })
    findAll(): Promise<Cat[]> {
        return this.catService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({
        status: 200,
        isArray: true,
        description: 'The found cat',
        type: Cat,
    })
    @ApiOperation({ summary: 'Fetch a particular cat' })
    findByID(@Param('id') id:string): Promise<Cat[]> {
        return this.catService.findById(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create cat' })
    create(@Body() createCat: CreateCatDto): Promise<Cat> {
        return this.catService.create(createCat);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update cat' })
    update(@Param('id') id:string, @Body() updateCat: UpdateCatDto): Promise<Cat> {
        return this.catService.update(id ,updateCat);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete cat' })
    delete(@Param('id') id:string): Promise<Cat> {
        return this.catService.delete(id);
    }
}
