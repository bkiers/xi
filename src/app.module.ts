import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './data/xi-dev.db',
      logging: console.log,
      autoLoadModels: true,
      models: [UserEntity],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
