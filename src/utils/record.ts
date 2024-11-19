import { ConflictError, NotFoundError } from '../core/ApiError';

export const needRecord = <T>(
  record?: T | null,
  err = new NotFoundError(),
): T => {
  if (!record) {
    throw err;
  }

  return record;
};

export const existRecord = <T>(
  record?: T | null,
  err = new ConflictError('Already exists'),
) => {
  if (record) {
    throw err;
  }
};
