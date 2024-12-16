---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
at_line: 0
skip_if: import mongoose
---
<% if (kind === 'reference') { -%>
  import mongoose from 'mongoose';
<% } -%>