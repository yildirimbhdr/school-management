import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/_common/typeorm';

@Module({
  providers: [ManagerService],
  controllers: [ManagerController],
  exports: [ManagerService],
  imports: [TypeOrmModule.forFeature([Manager])]
})
export class ManagerModule { }
