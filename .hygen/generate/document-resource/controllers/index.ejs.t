---
to: "src/controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.controller.ts"
---
import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  <%= h.inflection.capitalize(name) %>FindOptions,
  <%= h.inflection.camelize(name, true) %>Repository,
} from '../database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import {
  I<%= h.inflection.capitalize(name) %>AllSchema,
  I<%= h.inflection.capitalize(name) %>IdSchema,
  I<%= h.inflection.capitalize(name) %>CreateSchema,
  I<%= h.inflection.capitalize(name) %>UpdateSchema,
} from '../schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class <%= h.inflection.capitalize(name) %>Controller {
  // Get all <%= h.inflection.camelize(name, true) %>s by author
  public get<%= h.inflection.capitalize(name) %>s = asyncHandler(
    async (
      req: ParsedRequest<void, I<%= h.inflection.capitalize(name) %>AllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: <%= h.inflection.capitalize(name) %>FindOptions = {
        filter: {
          search: req.valid.query.search,
        },
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const <%= h.inflection.camelize(name, true) %>s = await <%= h.inflection.camelize(name, true) %>Repository.findForAdmin(options);

      res.ok({ message: 'success', data: <%= h.inflection.camelize(name, true) %>s });
    },
  );

  // Get <%= h.inflection.camelize(name, true) %> by Id for authenticated user
  public get<%= h.inflection.capitalize(name) %> = asyncHandler(
    async (
      req: ParsedRequest<void, void, I<%= h.inflection.capitalize(name) %>IdSchema>,
      res: Response,
    ): Promise<void> => {
      const <%= h.inflection.camelize(name, true) %> = needRecord(
        await <%= h.inflection.camelize(name, true) %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= h.inflection.capitalize(name) %> not found'),
      );

      res.ok({ message: 'success', data: <%= h.inflection.camelize(name, true) %> });
    },
  );

  // Create <%= h.inflection.camelize(name, true) %> handler
  public create<%= h.inflection.capitalize(name) %> = asyncHandler(
    async (
      req: ParsedRequest<I<%= h.inflection.capitalize(name) %>CreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const new<%= h.inflection.capitalize(name) %> = req.valid.body;
      const <%= h.inflection.camelize(name, true) %> = await <%= h.inflection.camelize(name, true) %>Repository.insert(new<%= h.inflection.capitalize(name) %>);
      if (<%= h.inflection.camelize(name, true) %> === null) {
        throw new InternalError();
      }
      res.created({ message: '<%= h.inflection.capitalize(name) %> has been created', data: <%= h.inflection.camelize(name, true) %> });
    },
  );

  // Update <%= h.inflection.camelize(name, true) %> by Id for authenticated user
  public update<%= h.inflection.capitalize(name) %> = asyncHandler(
    async (
      req: ParsedRequest<I<%= h.inflection.capitalize(name) %>UpdateSchema, void, I<%= h.inflection.capitalize(name) %>IdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const <%= h.inflection.camelize(name, true) %> = needRecord(
        await <%= h.inflection.camelize(name, true) %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= h.inflection.capitalize(name) %> not found'),
      );

      const data = await <%= h.inflection.camelize(name, true) %>Repository.patchById(<%= h.inflection.camelize(name, true) %>.id, updateBody);

      res.ok({ message: '<%= h.inflection.capitalize(name) %> has been updated', data });
    },
  );

  // Delete <%= h.inflection.camelize(name, true) %> by Id for authenticated user
  public delete<%= h.inflection.capitalize(name) %> = asyncHandler(
    async (
      req: ParsedRequest<void, void, I<%= h.inflection.capitalize(name) %>IdSchema>,
      res: Response,
    ): Promise<void> => {
      const <%= h.inflection.camelize(name, true) %> = needRecord(
        await <%= h.inflection.camelize(name, true) %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= h.inflection.capitalize(name) %> not found'),
      );

      await <%= h.inflection.camelize(name, true) %>Repository.deleteById(<%= h.inflection.camelize(name, true) %>.id);
      res.noContent({ message: '<%= h.inflection.capitalize(name) %> deleted successfully' });
    },
  );
}

export const <%= h.inflection.camelize(name, true) %>Controller = new <%= h.inflection.capitalize(name) %>Controller();
