import { Injectable, NestMiddleware, Inject } from "@nestjs/common";
import { getConnection, createConnection, ConnectionOptions } from "typeorm";

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  public static COMPANY_NAME = "host";

  async use(req: any, res: any, next: () => void) {
    const databaseName = req.headers[DatabaseMiddleware.COMPANY_NAME];
    const databases = {
      "127.0.0.1:3000": "sandbox01",
      "localhost:3000": "sandbox02"
    };

    const connection: ConnectionOptions = {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "sandbox",
      password: "sandbox",
      database: databases[databaseName],
      name: databaseName,
      entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
      synchronize: false
    };

    try {
      getConnection(databaseName);
    } catch (error) {
      await createConnection(connection);
    }

    next();
  }
}
