import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    HttpCode,
    Body,
    UseGuards,
    Param,
    Query,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokeDto, ParamsDto } from './dto';
import { MongoIdDto } from '../../common/dto/mongo-id.dto';
import { Joke } from './interfaces/joke.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('jokes')
@UseGuards(AuthGuard('jwt'))
export class JokesController {
    constructor(private readonly jokesService: JokesService) {}

    @Get()
    async index(@Query() params: ParamsDto) {
        return this.jokesService.findAll(params);
    }

    @Get(':id')
    async show(@Param() params: MongoIdDto): Promise<Joke> {
        return this.jokesService.findByIdOrFail(params.id);
    }

    @Post()
    async store(@Body() payload: JokeDto): Promise<Joke> {
        return this.jokesService.create(payload);
    }

    @Put(':id')
    async update(@Param() params: MongoIdDto, @Body() payload: JokeDto): Promise<Joke> {
        return this.jokesService.updateOrFail(params.id, payload);
    }

    @HttpCode(204)
    @Delete(':id')
    async destroy(@Param() params: MongoIdDto) {
        await this.jokesService.delete(params.id);
    }
}
