export const getKeysOf = <K extends string, V>(obj: { [key in K]: V }): K[] =>
  Object.keys(obj).filter((key): key is K => Number.isNaN(Number(key)));

export const getValuesOf = <K extends string, V>(obj: { [key in K]: V }): V[] =>
  getKeysOf(obj).map((key: K) => obj[key]);

export enum UserStatus {
  active = 'active',
  disactive = 'disactive',
}

export enum CarCategory {
  truck = 'truck',
}

export enum RoleCode {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Env {
  production = 'production',
  development = 'development',
  test = 'test',
}

// <creating-enum-type />

export enum OrderItemStatus {
  returned = 'returned',
  notreturned = 'notreturned',
}

export enum ProductType {
  piece = 'piece',
  car = 'car',
}

export enum ItemType {
  rent = 'rent',
  purchase = 'purchase',
}

export enum QuestionSessionStatus {
  failed = 'failed',
  passed = 'passed',
  started = 'started',
}

export enum SessionStatus {
  pending = 'pending',
  started = 'started',
  completed = 'completed',
}

export enum QuizStatus {
  active = 'active',
  disactive = 'disactive',
}

export enum BooleanString {
  true = 'true',
  false = 'false',
}
