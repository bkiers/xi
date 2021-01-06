import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserCreate } from './user.create';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRead } from './user.read';
import { ValidationFilter } from '../filter/validation.filter';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BaseController } from '../base.controller';

@ApiTags('users')
@Controller('api/users')
@UseFilters(new ValidationFilter())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController extends BaseController {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a single user' })
  @ApiResponse({
    status: 200,
    description: 'The user',
    type: UserRead,
  })
  async findOne(@Param('id') id: number): Promise<UserRead> {
    const entity = await this.userService.findById(id);

    if (entity === null) {
      throw new HttpException(
        `No user found with ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new UserRead(entity);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'All users',
    type: [UserRead],
  })
  async findAll(): Promise<UserRead[]> {
    const entities = await this.userService.findAll();

    return entities.map((entity) => new UserRead(entity));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: UserRead,
  })
  async create(
    @Request() req,
    @Body() userCreate: UserCreate,
  ): Promise<UserRead> {
    await super.checkAdmin(req);

    const entity = await this.userService.create(userCreate);

    return new UserRead(entity);
  }
}
