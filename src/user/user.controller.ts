import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { UserCreate } from './user.create';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRead } from './user.read';
import { ValidationFilter } from '../filter/validation.filter';

@ApiTags('users')
@Controller('users')
@UseFilters(new ValidationFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: [UserEntity],
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
  async create(@Body() userCreate: UserCreate): Promise<UserRead> {
    const entity = await this.userService.create(userCreate);

    return new UserRead(entity);
  }
}
