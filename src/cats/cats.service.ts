import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './cat.interface';
import { CreateCatDto } from './DTOs/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UpdateCatDto} from "./DTOs/update-cat.dto";


@Injectable()
export class CatsService {
    constructor(
        @InjectModel('Cat') private readonly catModel: Model<Cat>,
    ) {}

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }

    async findById(id: string): Promise<Cat[]> {
        return this.catModel.find({_id: id}).exec();
    }

    async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
        return this.catModel.findByIdAndUpdate(id, updateCatDto, {
            new: true,
        });
    }

    async delete(id: string): Promise<Cat> {
        return this.catModel.findByIdAndRemove(id);
    }
}