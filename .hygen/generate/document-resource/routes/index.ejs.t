---
to: "src/routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.routes.ts"
---
import { Router } from 'express';
import validator from '../middlewares/validator';
import <%= name %>Schema from '../schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { <%= name %>Controller } from '../controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.controller';
import authSchema from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';

export class <%= Name %>Routes {
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
    this.router.use(restrict(RoleCode.<%= role.toUpperCase() %>));
    this.router.use(authorizationMiddleware.authorization);

    // GET ALL <%= h.inflection.pluralize(name).toUpperCase() %>
    this.router.get(
      '/',
      validator({ query: <%= name %>Schema.<%= name %>All }),
      <%= name %>Controller.get<%= Name %>s,
    );

    // GET <%= name.toUpperCase() %> BY ID
    this.router.get(
      '/:id',
      validator({ params: <%= name %>Schema.<%= name %>Id }),
      <%= name %>Controller.get<%= Name %>,
    );

    // CREATE <%= name.toUpperCase() %>
    this.router.post(
      '/',
      validator({ body: <%= name %>Schema.<%= name %>Create }),
      <%= name %>Controller.create<%= Name %>,
    );

    // UPDATE <%= name.toUpperCase() %> BY ID
    this.router.patch(
      '/:id',
      validator({ params: <%= name %>Schema.<%= name %>Id, body: <%= name %>Schema.<%= name %>Update }),
      <%= name %>Controller.update<%= Name %>,
    );

    // DELETE <%= name.toUpperCase() %> BY ID
    this.router.delete(
      '/:id',
      validator({ params: <%= name %>Schema.<%= name %>Id }),
      <%= name %>Controller.delete<%= Name %>,
    );
  }
}

export const <%= name %>Routes = new <%= Name %>Routes();
