---
to: "src/routes/<%= nameDash %>.routes.ts"
---
import { Router } from 'express';
import validator from '../middlewares/validator';
import <%= name %>Schema from '../schemas/<%= nameDash %>.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { <%= name %>Controller } from '../controllers/<%= nameDash %>.controller';
import authSchema from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';
const {<%=  allRole %>}= RoleCode; 

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

    // GET ALL <%= h.inflection.pluralize(name).toUpperCase() %>
    this.router.get(
      '/',
      restrict(<%= roleGet %>),
      authorizationMiddleware.authorization,
      validator({ query: <%= name %>Schema.<%= name %>All }),
      <%= name %>Controller.get<%= h.inflection.pluralize(Name) %>,
    );

    // GET <%= name.toUpperCase() %> BY ID
    this.router.get(
      '/:id',
      restrict(<%= roleGet %>),
      authorizationMiddleware.authorization,
      validator({ params: <%= name %>Schema.<%= name %>Id }),
      <%= name %>Controller.get<%= Name %>,
    );

    // CREATE <%= name.toUpperCase() %>
    this.router.post(
      '/',
      restrict(<%= rolePost %>),
      authorizationMiddleware.authorization,
      validator({ body: <%= name %>Schema.<%= name %>Create }),
      <%= name %>Controller.create<%= Name %>,
    );

    // UPDATE <%= name.toUpperCase() %> BY ID
    this.router.patch(
      '/:id',
      restrict(<%= roleUpdate %>),
      authorizationMiddleware.authorization,
      validator({ params: <%= name %>Schema.<%= name %>Id, body: <%= name %>Schema.<%= name %>Update }),
      <%= name %>Controller.update<%= Name %>,
    );

    // DELETE <%= name.toUpperCase() %> BY ID
    this.router.delete(
      '/:id',
      restrict(<%= roleDelete %>),
      authorizationMiddleware.authorization,     
      validator({ params: <%= name %>Schema.<%= name %>Id }),
      <%= name %>Controller.delete<%= Name %>,
    );
  }
}

export const <%= name %>Routes = new <%= Name %>Routes();
