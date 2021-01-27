import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoginCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies['accessToken']) {
      try {
        jwt.verify(req.cookies['accessToken'], process.env.XI_TOKEN_SECRET);
        next();
        return;
      } catch (e) {
        // It has expired, or was tampered with, remove the cookie
        res.clearCookie('accessToken');
      }
    }

    res.redirect(`/login?returnPath=${req.path}`);
  }
}
