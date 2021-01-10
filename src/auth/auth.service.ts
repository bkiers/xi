import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordEntity } from './reset.password.entity';
import { uuid } from 'uuidv4';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { hashPassword } from '../util/string.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
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

  async requestResetPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (user === null) {
      return;
    }

    const threeHours = 1000 * 60 * 60 * 3;

    const entity = await ResetPasswordEntity.create({
      userId: user.id,
      code: uuid(),
      expiresAt: new Date(new Date().getTime() + threeHours),
    });

    await entity.reload({ include: [{ all: true }] });

    this.eventEmitter.emit('reset.password.created', entity);
  }

  async resetPassword(code: string, password: string): Promise<UserEntity> {
    const resetPasswordEntity = await ResetPasswordEntity.findOne({
      where: { code: code },
      include: [{ all: true }],
    });

    if (resetPasswordEntity === null) {
      throw new Error('That reset code no longer exists');
    }

    if (resetPasswordEntity.expired()) {
      throw new Error('That reset code has expired');
    }

    resetPasswordEntity.user.passwordHash = hashPassword(password);
    await resetPasswordEntity.user.save();
    await resetPasswordEntity.destroy();

    return this.userService.findById(resetPasswordEntity.userId);
  }
}
