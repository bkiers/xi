import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { ValidationFilter } from '../filter/validation.filter';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BaseController } from '../base.controller';
import { GameCreate } from './game.create';
import { GameRead } from './game.read';
import { GameService } from './game.service';

@ApiTags('games')
@Controller('games')
@UseFilters(new ValidationFilter())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GameController extends BaseController {
  constructor(
    protected readonly userService: UserService,
    protected readonly gameService: GameService,
  ) {
    super(userService);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a single game' })
  @ApiResponse({
    status: 200,
    description: 'The game',
    type: GameRead,
  })
  async findOne(@Param('id') id: number): Promise<GameRead> {
    const entity = await this.gameService.findById(id);

    if (entity === null) {
      throw new HttpException(
        `No game found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new GameRead(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Find all games' })
  @ApiResponse({
    status: 201,
    description: 'The created game',
    type: [GameRead],
  })
  async findAll(): Promise<GameRead[]> {
    const entities = await this.gameService.findAll();

    return entities.map((entity) => new GameRead(entity));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: 201,
    description: 'The created game',
    type: GameRead,
  })
  async create(
    @Request() req,
    @Body() gameCreate: GameCreate,
  ): Promise<GameRead> {
    const entity = await this.gameService.create(req.user.userId, gameCreate);

    return new GameRead(entity);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a game' })
  @ApiResponse({
    status: 204,
    description: 'When the game was successfully deleted',
  })
  async delete(@Request() req, @Param('id') id: number) {
    try {
      await this.gameService.delete(req.user.userId, id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
