import {
  Body,
  Controller,
  Get,
  HttpService,
  Post,
  Query,
  Render,
  Request,
  Res,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { GameService } from './game/game.service';
import { LoginRequest } from './auth/login.request';
import { LoginResponse } from './auth/login.response';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly gameService: GameService,
    private readonly http: HttpService,
  ) {}

  @Get('/')
  @ApiExcludeEndpoint()
  @Render('index')
  async index(@Request() req) {
    // const user = await this.authService.userFor(req.cookies['accessToken']);
    return {};
  }

  @Get('/login')
  @ApiExcludeEndpoint()
  @Render('login')
  async login(@Query('returnPath') returnPath) {
    return { returnPath: returnPath };
  }

  @Post('/login')
  @ApiExcludeEndpoint()
  async doLogin(
    @Query('returnPath') returnPath,
    @Body() loginRequest: LoginRequest = new LoginRequest(),
    @Res() res,
  ) {
    try {
      const loginResponse = (
        await this.http
          .post('http://localhost:3000/api/auth/login', loginRequest)
          .toPromise()
      ).data as LoginResponse;

      res.cookie('accessToken', loginResponse.access_token);

      return res.redirect(returnPath || '/');
    } catch (e) {
      return res.render('login', {
        data: loginRequest,
        error: e.response.data.message,
      });
    }
  }
}
