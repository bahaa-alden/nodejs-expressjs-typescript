---
inject: true
to: "./src/server.ts"
after: //R
---
import { <%= name %>Routes } from './routes/<%= nameDash %>.routes';