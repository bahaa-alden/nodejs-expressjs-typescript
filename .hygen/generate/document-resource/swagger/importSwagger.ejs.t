---
inject: true
to: "./src/swagger/swagger.ts"
at_line: 1
---
import { <%= Name %>, create<%= Name %>, update<%= Name %> } from './routes/<%= nameDash %>.swagger';