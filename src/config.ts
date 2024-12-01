import * as dotenv from 'dotenv';
import * as path from 'path';
import { object, string, nativeEnum } from 'zod';
import { Env } from './utils/enum';

dotenv.config({ path: path.join(__dirname, '../.env') });

const numericIdRegex = /^\d+$/u;

const envVarsSchema = object({
  API_URL: string({ message: 'API_URL is required' }),
  APP_NAME: string({ message: 'APP NAME is required' }),
  EMAIL_FROM: string({ message: 'EMAIL FROM is required' }),
  EMAIL_API_KEY: string({ message: 'EMAIL API KEY is required' }),
  NODE_ENV: nativeEnum(Env).default(Env.development),
  LOG_DIR: string(),
  PORT: string().regex(numericIdRegex).default('3000'),
  MONGODB_URL: string({ message: 'Mongo DB url is required' }),
  JWT_SECRET: string({ message: 'JWT secret key is required' }),
  JWT_ACCESS_EXPIRATION: string().describe(
    'minutes after which access tokens expire',
  ),
  SMTP_HOST: string({ message: 'SMTP_HOST is required' }),
  SMTP_PORT: string().regex(numericIdRegex, {
    message: 'SMTP_PORT must be a number',
  }),
  SMTP_USER: string({ message: 'SMTP_USER is required' }),
  SMTP_PASS: string({ message: 'SMTP_PASS is required' }),
  SMTP_SECURE: string()
    .transform((data: string) => data === 'true')
    .default('false'),
  CLOUDINARY_CLOUD_NAME: string({
    message: 'CLOUDINARY_CLOUD_NAME is required',
  }),
  CLOUDINARY_API_KEY: string({ message: 'CLOUDINARY_API_KEY is required' }),
  CLOUDINARY_API_SECRET: string({
    message: 'CLOUDINARY_API_SECRET is required',
  }),
}).passthrough();

const envVars = envVarsSchema.parse(process.env);

export const env_vars = {
  apiUrl: envVars.API_URL,
  app_name: envVars.APP_NAME,
  email_key: envVars.EMAIL_API_KEY,
  sender: envVars.EMAIL_FROM,
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
  smtp: {
    host: envVars.SMTP_HOST,
    port: Number(envVars.SMTP_PORT),
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASS,
    secure: envVars.SMTP_SECURE,
  },
  cloudinary: {
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET,
  },
};
