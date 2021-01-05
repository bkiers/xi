import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserCreate } from './user.create';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  async findById(id: number): Promise<UserEntity | null> {
    return UserEntity.findByPk(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return UserEntity.findOne({ where: { email: email } });
  }

  async findAll(): Promise<UserEntity[]> {
    return UserEntity.findAll();
  }

  async create(userCreate: UserCreate): Promise<UserEntity> {
    // TODO get `rounds` from config
    const rounds = 10;
    const passwordHash = bcrypt.hashSync(userCreate.password, rounds);
    const userEntity = new UserEntity({ passwordHash, ...userCreate });

    return userEntity.save();
  }

  async loggedInUserIsAdmin(req: any): Promise<boolean> {
    if (!req?.user?.userId) {
      return false;
    }

    const user = await this.findById(req?.user?.userId);

    return user?.isAdmin === true;
  }
}
