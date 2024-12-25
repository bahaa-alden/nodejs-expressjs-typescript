---
to: "src/controllers/<%= nameDash %>.controller.ts"
---
import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  <%= Name %>FindOptions,
  <%= name %>Repository,
} from '../database/repositories/<%= nameDash %>.repository';
import {
  I<%= Name %>AllSchema,
  I<%= Name %>IdSchema,
  I<%= Name %>CreateSchema,
  I<%= Name %>UpdateSchema,
} from '../schemas/<%= nameDash %>.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class <%= Name %>Controller {
  // Get all <%= h.inflection.pluralize(Name) %> by author
  public get<%= h.inflection.pluralize(Name) %> = asyncHandler(
    async (
      req: ParsedRequest<void, I<%= Name %>AllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: <%= Name %>FindOptions = {
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
      const <%= h.inflection.pluralize(name) %> = await <%= name %>Repository.findForAdmin(options);

      res.ok({ message: 'success', data: <%= h.inflection.pluralize(name) %> });
    },
  );

  // Get <%= name %> by Id for authenticated user
  public get<%= Name %> = asyncHandler(
    async (
      req: ParsedRequest<void, void, I<%= Name %>IdSchema>,
      res: Response,
    ): Promise<void> => {
      const <%= name %> = needRecord(
        await <%= name %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= Name %> not found'),
      );

      res.ok({ message: 'success', data: <%= name %> });
    },
  );

  // Create <%= name %> handler
  public create<%= Name %> = asyncHandler(
    async (
      req: ParsedRequest<I<%= Name %>CreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const new<%= Name %> = req.valid.body;
      const <%= name %> = await <%= name %>Repository.insert(new<%= Name %>);
      if (<%= name %> === null) {
        throw new InternalError();
      }
      res.created({ message: '<%= Name %> has been created', data: <%= name %> });
    },
  );

  // Update <%= name %> by Id for authenticated user
  public update<%= Name %> = asyncHandler(
    async (
      req: ParsedRequest<I<%= Name %>UpdateSchema, void, I<%= Name %>IdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const <%= name %> = needRecord(
        await <%= name %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= Name %> not found'),
      );

      const data = await <%= name %>Repository.patchById(<%= name %>.id, updateBody);

      res.ok({ message: '<%= Name %> has been updated', data });
    },
  );

  // Delete <%= name %> by Id for authenticated user
  public delete<%= Name %> = asyncHandler(
    async (
      req: ParsedRequest<void, void, I<%= Name %>IdSchema>,
      res: Response,
    ): Promise<void> => {
      const <%= name %> = needRecord(
        await <%= name %>Repository.findById(
          req.valid.params.id,
        ),
        new NotFoundError('<%= Name %> not found'),
      );

      await <%= name %>Repository.deleteById(<%= name %>.id);
      res.noContent({ message: '<%= Name %> deleted successfully' });
    },
  );
}

export const <%= name %>Controller = new <%= Name %>Controller();
