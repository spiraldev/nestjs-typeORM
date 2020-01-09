
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormService } from './form.service';
import { FormController } from './form.controller';
// import { FormsEntity } from '../model/form.entity';
//TypeOrmModule.forFeature([FormsEntity])
@Module({
  imports: [],
  providers: [FormService],
  controllers: [FormController],
  exports: []
})
export class FormModule { }