import { Injectable } from '@nestjs/common';
import { UserCreate } from './user.create';
import { UserEntity } from './user.entity';
import { hashPassword } from '../util/string.utils';

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
    const passwordHash = hashPassword(userCreate.password);
    const userEntity = new UserEntity({ passwordHash, ...userCreate });

    return userEntity.save();
  }

  async loggedInUserIsAdmin(req: any): Promise<boolean> {
    const user = await this.findById(req.user.userId);

    return user?.isAdmin === true;
  }
}
