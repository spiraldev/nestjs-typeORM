// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';

import { FormModule } from './form/form.module';
import { connect } from 'http2';

@Module({
  imports: [
   
    FormModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

