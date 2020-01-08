// src/config/config.service.ts
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Pool } from "pg";
import { head } from 'lodash';
require("dotenv").config();
export interface PostgresQuery {
  sql: string;
  values?: any[];
}
export const sandboxAdapterConfig: { [key: string]: any } = {
  type: "postgres",
  user: process.env.DB_USER || "sandbox",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "tenant",
  password: process.env.DB_PASSWORD || "sandbox",
  port: process.env.DB_PORT || 5432,
  entities: ["**/*.entity{.ts,.js}"],
  migrationsTableName: "migration",
  migrations: ["src/migration/*.ts"],
  cli: {
    migrationsDir: "src/migration"
  },
  ssl: false
};

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    
    const foo = this.getConnection().then();

    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DATABASE"),

      entities: ["**/*.entity{.ts,.js}"],

      migrationsTableName: "migration",

      migrations: ["src/migration/*.ts"],

      cli: {
        migrationsDir: "src/migration"
      },

      ssl: this.isProduction()
    };
  }
  private pool;
  private async getClient(): Promise<any> {
    this.pool = new Pool({
      ...sandboxAdapterConfig
    });
    return await this.pool.connect();
  }
  public async query(query: PostgresQuery): Promise<any> {
    const client = await this.getClient();
    return new Promise((resolve, reject) => {
      client.query({ text: query.sql, values: query.values }, (err, resp) => {
        if (err) {
          reject(err.stack);
          client.release(true);
          return;
        }
        resolve(resp.rows);
        client.release(true);
        return;
      });
    });
  }
  public async getConnection(): Promise<any> {
    const sql = `
			SELECT *,'postgres' as type,'localhost' as host,5432 as port
      FROM public.connections 
			LIMIT 1
		`;
    return head(await this.query({ sql, values: [] }));
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE"
]);

export { configService };
