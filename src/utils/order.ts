export interface OrderOptions {
  column: string;
  direction: OrderDirection;
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export const defaultOrderParams = (
  column: string,
  direction: string,
): OrderOptions => ({
  column,
  direction: direction as OrderDirection,
});
