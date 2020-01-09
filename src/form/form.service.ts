import { Injectable, Inject } from "@nestjs/common";
import { Repository, getManager } from "typeorm";
import { FormsEntity } from "../model/form.entity";
import { REQUEST } from "@nestjs/core";
import { DatabaseMiddleware } from "../DatabaseMiddleware";

@Injectable()
export class FormService {
  private repository: Repository<FormsEntity>;

  constructor(@Inject(REQUEST) private readonly request) {
    this.repository = getManager(
      this.request.headers[DatabaseMiddleware.COMPANY_NAME]
    ).getRepository(FormsEntity);
  }

  async findOne(): Promise<any> {
    return await this.repository.find();
  }
}
