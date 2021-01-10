import {
  Body,
  Controller,
  Get,
  HttpService,
  Param,
  Post,
  Query,
  Render,
  Request,
  Res,
} from '@nestjs/common';
import { Method } from 'axios';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { LoginRequest } from './model/request/login.request';
import { LoginResponse } from './model/response/login.response';
import { GameRead } from './game/game.read';
import { humanReadable } from './util/string.utils';
import { RequestResetPasswordRequest } from './model/request/request.reset.password.request';
import { ResetPasswordRequest } from './model/request/reset.password.request';
import { UserRead } from './user/user.read';
import { MoveCreate } from './game/move.create';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/')
  @ApiExcludeEndpoint()
  async index(@Res() res) {
    return res.redirect('/games');
  }

  @Get('/games')
  @ApiExcludeEndpoint()
  @Render('games')
  async games(@Request() req) {
    const games = await this.http<GameRead[]>('/api/games', 'get', req);

    return { games: games };
  }

  @Get('/games/:id')
  @ApiExcludeEndpoint()
  @Render('game')
  async game(@Param('id') id: number, @Request() req) {
    const game = await this.http<GameRead>(`/api/games/${id}`, 'get', req);

    return { game: game };
  }

  @Post('/games/:id/move/:fr/:fc/:tr/:tc')
  @ApiExcludeEndpoint()
  async move(
    @Param('id') id: number,
    @Param('fr') fromRowIndex: number,
    @Param('fc') fromColumnIndex: number,
    @Param('tr') toRowIndex: number,
    @Param('tc') toColumnIndex: number,
    @Request() req,
    @Res() res,
  ) {
    try {
      await this.http(
        `/api/games/${id}/move`,
        'post',
        req,
        new MoveCreate(
          fromRowIndex,
          fromColumnIndex,
          toRowIndex,
          toColumnIndex,
        ),
      );
      res.status(200).json({ error: null });
    } catch (e) {
      res.status(400).json({ error: e.response.data.message });
    }
  }

  @Get('/games/:id/accept')
  @ApiExcludeEndpoint()
  @Render('accept')
  async acceptGame(@Param('id') id: number, @Request() req) {
    const game = await this.http<GameRead>(`/api/games/${id}`, 'get', req);

    return {
      game: game,
      timePerMove: humanReadable(game.secondsPerMove),
    };
  }

  @Post('/games/:id/accept')
  @ApiExcludeEndpoint()
  async doAcceptGame(@Param('id') id: number, @Request() req, @Res() res) {
    try {
      await this.http(`/api/games/${id}/accept`, 'post', req);

      return res.redirect(`/games/${id}`);
    } catch (e) {
      const game = await this.http<GameRead>(`/api/games/${id}`, 'get', req);

      return res.render('accept', {
        game: game,
        timePerMove: humanReadable(game.secondsPerMove),
        error: e.response.data.message,
      });
    }
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
      const loginResponse = await this.http<LoginResponse>(
        '/api/auth/login',
        'post',
        null,
        loginRequest,
      );

      res.cookie('accessToken', loginResponse.access_token);

      return res.redirect(returnPath || '/');
    } catch (e) {
      return res.render('login', {
        data: loginRequest,
        error: e.response.data.message,
      });
    }
  }

  @Get('/request-reset-password')
  @ApiExcludeEndpoint()
  @Render('request-reset-password')
  async requestResetPassword() {
    return { confirmed: false };
  }

  @Post('/request-reset-password')
  @ApiExcludeEndpoint()
  async doRequestResetPassword(
    @Body() requestResetPasswordRequest: RequestResetPasswordRequest,
    @Res() res,
  ) {
    await this.http<LoginResponse>(
      '/api/auth/request-reset-password',
      'post',
      null,
      requestResetPasswordRequest,
    );

    res.render('request-reset-password', { confirmed: true });
  }

  @Get('/reset-password/:code')
  @ApiExcludeEndpoint()
  @Render('reset-password')
  async resetPassword(@Param('code') code: string) {
    return { code: code };
  }

  @Post('/reset-password')
  @ApiExcludeEndpoint()
  async doResetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
    @Res() res,
  ) {
    try {
      const user = await this.http<UserRead>(
        '/api/auth/reset-password',
        'post',
        null,
        resetPasswordRequest,
      );

      const loginRequest = new LoginRequest();

      loginRequest.email = user.email;

      return res.render('login', { data: loginRequest });
    } catch (e) {
      return res.render('reset-password', { error: e.response.data.message });
    }
  }

  private async http<T>(
    url: string,
    method: string,
    req: any = null,
    data: any = null,
  ): Promise<T> {
    const axiosResponse = await this.httpService
      .request({
        baseURL: `http://localhost:${process.env.XI_PORT}`,
        url: url,
        method: method as Method,
        headers: { Authorization: `Bearer ${req?.cookies['accessToken']}` },
        data: data,
      })
      .toPromise();

    return axiosResponse.data as T;
  }
}
