import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The access/bearer token',
    type: LoginResponse,
  })
  async login(
    @Body() loginRequest: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
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
