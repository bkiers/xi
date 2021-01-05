import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.findByEmail(email);

    if (user === null || !bcrypt.compareSync(password, user.passwordHash)) {
      return null;
    }

    return user;
  }

  accessTokenFor(user: UserEntity): string {
    const payload = { email: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }
}
