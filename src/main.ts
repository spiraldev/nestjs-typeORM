import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseMiddleware } from "./DatabaseMiddleware";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new DatabaseMiddleware().use);
  await app.listen(3000);
}
bootstrap();
