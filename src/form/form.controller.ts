import { Controller, Get } from "@nestjs/common";
import { FormService } from "./form.service";

@Controller("form")
export class FormController {
  constructor(private serv: FormService) {}

  @Get()
  public async getAll() {
    return await this.serv.findOne();
  }
}
