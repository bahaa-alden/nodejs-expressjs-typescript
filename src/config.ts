import * as dotenv from "dotenv";
import * as path from "path";
import * as z from "joi";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = z
  .object()
  .keys({
    NODE_ENV: z.string().valid("taskion", "development", "test").required(),
    LOG_DIR: z.string().required(),
    PORT: z.number().default(3000),
    MONGODB_URL: z.string().required().description("Mongo DB url"),
    JWT_SECRET: z.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: z
      .number()
      .default(30)
      .description("minutes after which access tokens expire"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env_vars = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  log_dir: envVars.LOG_DIR,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpiration: envVars.JWT_ACCESS_EXPIRATION,
  },
};
