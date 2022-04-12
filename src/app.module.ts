import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmCongid as typeOrmConfig } from './config/typeorm.config';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [WorkoutsModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
