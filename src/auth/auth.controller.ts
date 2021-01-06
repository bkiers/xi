import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';
import { BaseController } from '../base.controller';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    protected readonly userService: UserService,
  ) {
    super(userService);
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The access/bearer token',
    type: LoginResponse,
  })
  async login(@Body() loginRequest: LoginRequest) {
    const user = await this.authService.validateUser(
      loginRequest.email,
      loginRequest.password,
    );

    if (user === null) {
      throw new HttpException(
        'Invalid email/password combination',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.authService.accessTokenFor(user);

    return new LoginResponse(accessToken);
  }
}
