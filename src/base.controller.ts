import { UserService } from './user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseController {
  constructor(protected readonly userService: UserService) {}

  protected async checkAdmin(req: any) {
    if (!(await this.userService.loggedInUserIsAdmin(req))) {
      throw new HttpException('Sorry, no can do :(', HttpStatus.UNAUTHORIZED);
    }
  }
}
