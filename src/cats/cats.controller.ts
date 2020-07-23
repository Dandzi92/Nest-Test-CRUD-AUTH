import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiResponse, ApiTags,  ApiOperation } from "@nestjs/swagger";
import {CreateCatDto} from "./create-cat.dto";
import {CatsService} from "./cats.service";
import { Cat } from './cat.interface';
import {UpdateCatDto} from "./update-cat.dto";


@ApiTags("Cats")
@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}

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

    @Post()
    @ApiOperation({ summary: 'Create cat' })
    create(@Body() createCat: CreateCatDto): Promise<Cat> {
        return this.catService.create(createCat);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update cat' })
    update(@Param('id') id:string, @Body() updateCat: UpdateCatDto): Promise<Cat> {
        return this.catService.update(id ,updateCat);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete cat' })
    delete(@Param('id') id:string): Promise<Cat> {
        return this.catService.delete(id);
    }
}
