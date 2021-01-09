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
import { LoginRequest } from './auth/login.request';
import { LoginResponse } from './auth/login.response';
import { GameRead } from './game/game.read';
import { humanReadable } from './util/string.utils';

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
