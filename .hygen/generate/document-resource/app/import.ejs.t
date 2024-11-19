---
inject: true
to: "./src/server.ts"
after: //R
---
import { <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Routes } from './routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.routes';