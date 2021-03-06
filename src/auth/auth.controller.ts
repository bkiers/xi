import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest } from '../model/request/login.request';
import { LoginResponse } from '../model/response/login.response';
import { RequestResetPasswordRequest } from '../model/request/request.reset.password.request';
import { ResetPasswordRequest } from '../model/request/reset.password.request';
import { UserService } from '../user/user.service';
import { UserRead } from '../user/user.read';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    protected readonly authService: AuthService,
    protected readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The access/bearer token',
    type: LoginResponse,
  })
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginRequest.email,
      loginRequest.password,
    );

    if (user === null) {
      throw new UnauthorizedException('Invalid email/password combination');
    }

    const accessToken = this.authService.accessTokenFor(user);

    return new LoginResponse(accessToken);
  }

  @Post('request-reset-password')
  @ApiResponse({ status: 200 })
  async requestResetPassword(
    @Body() requestResetPasswordRequest: RequestResetPasswordRequest,
  ) {
    await this.authService.requestResetPassword(
      requestResetPasswordRequest.email,
    );
  }

  @Post('reset-password')
  @ApiResponse({ status: 200 })
  async resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
    try {
      const userEntity = await this.authService.resetPassword(
        resetPasswordRequest.code,
        resetPasswordRequest.password,
      );

      return new UserRead(userEntity);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
