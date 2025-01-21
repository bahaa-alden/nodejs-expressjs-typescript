import * as swaggerJsdoc from 'swagger-jsdoc';
import { signUp } from './routes/auth.swagger';
import { env_vars } from '../config';
import {
  DuplicateEmail,
  Forbidden,
  NotFound,
  Unauthorized,
  Error,
} from './components';
import { createUser, updateMe, User } from './routes/users.swagger';
const options = {
  url: '',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
      description:
        'This is an API store application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${env_vars.port}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        signUp,
        createUser,
        updateMe,
        User,
        Error,
      },
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the token : abcde12345".',
        },
      },
      responses: {
        DuplicateEmail,
        Forbidden,
        NotFound,
        Unauthorized,
        201: {
          description: 'created',
        },
        200: {
          description: 'ok',
        },
        204: {
          description: 'No content',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  apis: ['./dist/swagger/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
