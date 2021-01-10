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
  Query,
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

@ApiTags('users')
@Controller('api/users')
@UseFilters(new ValidationFilter())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(protected readonly userService: UserService) {}

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
  async findAll(
    @Request() req,
    @Query('onlyOthers') onlyOthers = false,
  ): Promise<UserRead[]> {
    const entities = await this.userService.findAll();
    const users = entities.map((entity) => new UserRead(entity));

    return onlyOthers ? users.filter((u) => u.id !== req.user.userId) : users;
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
    if (!(await this.userService.loggedInUserIsAdmin(req))) {
      throw new HttpException('Sorry, no can do :(', HttpStatus.UNAUTHORIZED);
    }

    const entity = await this.userService.create(userCreate);

    return new UserRead(entity);
  }
}
