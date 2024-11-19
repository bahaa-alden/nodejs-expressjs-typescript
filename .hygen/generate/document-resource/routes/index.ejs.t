---
to: "src/routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.routes.ts"
---
import { Router } from 'express';
import validator from '../middlewares/validator';
import <%= h.inflection.camelize(name, true) %>Schema from '../schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { <%= h.inflection.camelize(name, true) %>Controller } from '../controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.controller';
import authSchema from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';

export class <%= h.inflection.capitalize(name) %>Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authController.authenticateJWT,
    );

    // ONLY FOR <%= h.inflection.pluralize(role).toUpperCase() %>
    this.router.use(restrict(RoleCode.<%= role %>));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL <%= h.inflection.pluralize(name).toUpperCase() %>
    this.router.get(
      '/',
      validator({ query: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>All }),
      <%= h.inflection.camelize(name, true) %>Controller.get<%= h.inflection.capitalize(name) %>s,
    );

    // GET <%= name.toUpperCase() %> BY ID
    this.router.get(
      '/:id',
      validator({ params: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>Id }),
      <%= h.inflection.camelize(name, true) %>Controller.get<%= h.inflection.capitalize(name,true) %>,
    );

    // CREATE <%= name.toUpperCase() %>
    this.router.post(
      '/',
      validator({ body: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>Create }),
      <%= h.inflection.camelize(name, true) %>Controller.create<%= h.inflection.capitalize(name,true) %>,
    );

    // UPDATE <%= name.toUpperCase() %> BY ID
    this.router.patch(
      '/:id',
      validator({ params: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>Id, body: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>Update }),
      <%= h.inflection.camelize(name, true) %>Controller.update<%= h.inflection.capitalize(name,true) %>,
    );

    // DELETE <%= name.toUpperCase() %> BY ID
    this.router.delete(
      '/:id',
      validator({ params: <%= h.inflection.camelize(name, true) %>Schema.<%= h.inflection.camelize(name, true) %>Id }),
      <%= h.inflection.camelize(name, true) %>Controller.delete<%= h.inflection.capitalize(name,true) %>,
    );
  }
}

export const <%= h.inflection.camelize(name, true) %>Routes = new <%= h.inflection.capitalize(name,true) %>Routes();
