---
inject: true
to: "./src/server.ts"
prepend: true
---
import { <%= name %>Routes } from './routes/<%= nameDash %>.routes';