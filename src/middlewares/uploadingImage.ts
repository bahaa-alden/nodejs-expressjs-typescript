import * as multer from 'multer';
import { Request } from 'express';
import { BadRequestError } from '../core/ApiError';

// type FilePhoto
const multerStorage = multer.memoryStorage();

const multerFilter: any = (req: Request, file: any, cb: any): void => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else
    cb(new BadRequestError('Not an image! Please upload only images.'), false);
};

export const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB per file
  fileFilter: multerFilter,
});
