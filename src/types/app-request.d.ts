import { Request } from "express";

declare interface ParsedRequest<B = any, Q = any, P = any, H = any>
  extends Request {
  valid: { body: B; query: Q; params: P; headers: H };
}
