import { Response, ParsedRequest } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import { cloudinaryService } from '../services/external/cloudinary';
import { BadRequestError } from '../core/ApiError';

export class ImageController {
  public createImage = asyncHandler(
    async (
      req: ParsedRequest,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0)
        throw new BadRequestError('No files uploaded');

      const photos = await Promise.all(
        files.map(async (e: any) => {
          const response = await cloudinaryService.uploadPhoto(e.buffer);
          return response.url;
        }),
      );

      res.created({ message: 'uploaded', data: photos });
    },
  );
}

export const imageController = new ImageController();
