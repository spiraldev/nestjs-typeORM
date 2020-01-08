import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormsEntity } from '../model/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(@InjectRepository(FormsEntity) private readonly repo: Repository<FormsEntity>) { }

  public async getAll() {
    return await this.repo.find();
  }
}