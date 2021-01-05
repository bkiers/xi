import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginRequest } from './auth/login.request';
import { LoginResponse } from './auth/login.response';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
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
