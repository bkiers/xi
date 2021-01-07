import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoginCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggedIn = req.cookies['accessToken'] || req.user;

    if (loggedIn) {
      next();
    } else {
      res.redirect(`/login?returnPath=${req.path}`);
    }
  }
}
