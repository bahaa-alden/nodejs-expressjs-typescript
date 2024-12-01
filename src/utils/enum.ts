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

export enum BooleanString {
  true = 'true',
  false = 'false',
}
