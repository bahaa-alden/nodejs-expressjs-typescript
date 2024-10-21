import * as dotenv from 'dotenv';
import * as path from 'path';
import { object, string, nativeEnum } from 'zod';
import { Env } from './utils/enum';

dotenv.config({ path: path.join(__dirname, '../.env') });

const numericIdRegex = /^\d+$/u;

const envVarsSchema = object({
  NODE_ENV: nativeEnum(Env).default(Env.development),
  LOG_DIR: string(),
  PORT: string().regex(numericIdRegex).default('3000'),
  MONGODB_URL: string({ message: 'Mongo DB url is required' }),
  JWT_SECRET: string({ message: 'JWT secret key is required' }),
  JWT_ACCESS_EXPIRATION: string().describe(
    'minutes after which access tokens expire',
  ),
}).passthrough();

const envVars = envVarsSchema.parse(process.env);

export const env_vars = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  log_dir: envVars.LOG_DIR,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpiration: envVars.JWT_ACCESS_EXPIRATION,
  },
};
