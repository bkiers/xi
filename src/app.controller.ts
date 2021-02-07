import {
  Body,
  Controller,
  Get,
  HttpService,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
  Request,
  Res,
  UseFilters,
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
import { GameCreate } from './game/game.create';
import { DrawProposalRequest } from './model/request/draw.proposal.request';
import { join } from 'path';
import { projectRoot } from './main';
import * as fs from 'fs';
import { NotFoundExceptionFilter } from './filter/not.found.exception.filter';

@UseFilters(new NotFoundExceptionFilter())
@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/games/create')
  @ApiExcludeEndpoint()
  @Render('create')
  async create(@Request() req) {
    const users = await this.http<UserRead[]>(
      '/api/users?onlyOthers=true',
      'get',
      req,
    );

    return { opponents: users, message: null };
  }

  @Post('/games/create')
  @ApiExcludeEndpoint()
  @Render('create')
  async doCreate(
    @Body() gameCreate: GameCreate = new GameCreate(),
    @Request() req,
  ) {
    try {
      await this.http(`/api/games`, 'post', req, gameCreate);

      return { message: 'Invitation sent!' };
    } catch (e) {
      return { error: e.response.data.message };
    }
  }

  @Get('/')
  @ApiExcludeEndpoint()
  async index(@Res() res) {
    return res.redirect('/games');
  }

  @Get('/games')
  @ApiExcludeEndpoint()
  @Render('games')
  async games(@Request() req) {
    const deploy = fs.readFileSync(join(projectRoot(), 'deploy.txt'), 'utf8');
    const games = await this.http<GameRead[]>('/api/games', 'get', req);

    return { games: games, deploy: deploy };
  }

  @Get('/games/:id')
  @ApiExcludeEndpoint()
  @Render('game')
  async game(@Param('id') id: string, @Request() req) {
    const game = await this.http<GameRead>(`/api/games/${id}`, 'get', req);

    return { game: game };
  }

  @Post('/games/:id/draw/propose')
  @ApiExcludeEndpoint()
  async proposeDraw(@Param('id') id: string, @Request() req, @Res() res) {
    try {
      await this.http(`/api/games/${id}/draw/propose`, 'post', req);
      res.status(200).json({ error: null });
    } catch (e) {
      res.status(400).json({ error: e.response.data.message });
    }
  }

  @Post('/games/:id/forfeit')
  @ApiExcludeEndpoint()
  async forfeit(@Param('id') id: string, @Request() req, @Res() res) {
    try {
      await this.http(`/api/games/${id}/forfeit`, 'post', req);
      res.status(200).json({ error: null });
    } catch (e) {
      res.status(400).json({ error: e.response.data.message });
    }
  }

  @Post('/games/:id/move/:fr/:fc/:tr/:tc/:confirm')
  @ApiExcludeEndpoint()
  async move(
    @Param('id') id: string,
    @Param('fr') fromRowIndex: string,
    @Param('fc') fromColumnIndex: string,
    @Param('tr') toRowIndex: string,
    @Param('tc') toColumnIndex: string,
    @Request() req,
    @Res() res,
  ) {
    try {
      await this.http(
        `/api/games/${id}/move`,
        'post',
        req,
        new MoveCreate(
          parseInt(fromRowIndex, 10),
          parseInt(fromColumnIndex, 10),
          parseInt(toRowIndex, 10),
          parseInt(toColumnIndex, 10),
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
  async acceptGame(@Param('id') id: string, @Request() req) {
    const game = await this.http<GameRead>(`/api/games/${id}`, 'get', req);

    return {
      game: game,
      timePerMove: humanReadable(game.secondsPerMove),
    };
  }

  @Post('/games/:id/accept')
  @ApiExcludeEndpoint()
  async doAcceptGame(@Param('id') id: string, @Request() req, @Res() res) {
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

  @Get('/games/:id/draw')
  @ApiExcludeEndpoint()
  @Render('draw')
  async draw(@Param('id') id: string) {
    return { gameId: id, confirmed: false };
  }

  @Post('/games/:id/draw')
  @ApiExcludeEndpoint()
  async doDraw(
    @Param('id') id: string,
    @Body() drawProposalRequest: DrawProposalRequest,
    @Request() req,
    @Res() res,
  ) {
    try {
      await this.http(
        `/api/games/${id}/draw/${drawProposalRequest.accepted}`,
        'post',
        req,
      );

      res.render('draw', { gameId: id, confirmed: true });
    } catch (e) {
      res.render('draw', { gameId: id, error: e.response.data.message });
    }
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

      res.render('login', { data: loginRequest });
    } catch (e) {
      res.render('reset-password', { error: e.response.data.message });
    }
  }

  private async http<T>(
    url: string,
    method: string,
    req: any = null,
    data: any = null,
  ): Promise<T> {
    try {
      const axiosResponse = await this.httpService
        .request({
          baseURL: `${process.env.XI_API_URL}`,
          url: url,
          method: method as Method,
          headers: { Authorization: `Bearer ${req?.cookies['accessToken']}` },
          data: data,
        })
        .toPromise();

      return axiosResponse.data as T;
    } catch (e) {
      if (e.response.status === 404) {
        throw new NotFoundException(e.response.message);
      }

      throw e;
    }
  }
}
