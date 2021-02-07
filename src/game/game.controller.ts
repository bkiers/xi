import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
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
import { ValidationFilter } from '../filter/validation.filter';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { GameCreate } from './game.create';
import { GameRead } from './game.read';
import { GameService } from './game.service';
import { MoveCreate } from './move.create';

@ApiTags('games')
@Controller('api/games')
@UseFilters(new ValidationFilter())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GameController {
  constructor(protected readonly gameService: GameService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a single game' })
  @ApiResponse({
    status: 200,
    description: 'The game',
    type: GameRead,
  })
  async findOne(@Param('id') id: number, @Request() req): Promise<GameRead> {
    const entity = await this.gameService.findById(id);

    if (entity === null) {
      throw new NotFoundException(`No game found with id ${id}`);
    }

    return new GameRead(entity, req.user.userId);
  }

  @Post(':id/draw/propose')
  @ApiOperation({ summary: 'Propose a draw' })
  @ApiResponse({
    status: 200,
  })
  async proposeDraw(@Request() req, @Param('id') id: number) {
    try {
      await this.gameService.proposeDraw(id, req.user.userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post(':id/draw/:accepted')
  @ApiOperation({ summary: 'Accept or reject a draw proposal' })
  @ApiResponse({
    status: 200,
  })
  async acceptOrRejectDrawProposal(
    @Request() req,
    @Param('id') id: number,
    @Param('accepted') accepted: string,
  ) {
    try {
      await this.gameService.acceptOrRejectDrawProposal(
        id,
        req.user.userId,
        accepted === 'true',
      );
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept a game invitation' })
  @ApiResponse({
    status: 200,
    description: 'The accepted game',
    type: GameRead,
  })
  async accept(@Request() req, @Param('id') id: number): Promise<GameRead> {
    try {
      const entity = await this.gameService.accept(id, req.user.userId);

      return new GameRead(entity, req.user.userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post(':id/forfeit')
  @ApiOperation({ summary: 'Forfeit a game' })
  @ApiResponse({
    status: 200,
    description: 'The forfeited game',
    type: GameRead,
  })
  async forfeit(@Request() req, @Param('id') id: number): Promise<GameRead> {
    try {
      const entity = await this.gameService.forfeit(id, req.user.userId);

      return new GameRead(entity, req.user.userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find all games' })
  @ApiResponse({
    status: 201,
    description: 'The created game',
    type: [GameRead],
  })
  async findAll(@Request() req): Promise<GameRead[]> {
    const entities = await this.gameService.findAll();

    return entities.map((entity) => new GameRead(entity, req.user.userId));
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

    return new GameRead(entity, req.user.userId);
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
      throw new BadRequestException(e.message);
    }
  }

  @Post(':id/move')
  @ApiOperation({ summary: 'Make a move' })
  @ApiResponse({
    status: 200,
    description: 'The game',
    type: GameRead,
  })
  async move(
    @Request() req,
    @Param('id') id: number,
    @Body() moveCreate: MoveCreate,
  ): Promise<GameRead> {
    try {
      const entity = await this.gameService.move(
        id,
        req.user.userId,
        moveCreate.fromColumnIndex,
        moveCreate.fromRowIndex,
        moveCreate.toColumnIndex,
        moveCreate.toRowIndex,
      );

      return new GameRead(entity, req.user.userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
