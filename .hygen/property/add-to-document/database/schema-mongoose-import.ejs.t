---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
at_line: 0
skip_if: import mongoose
---
<% if (kind === 'reference') { -%>
  import mongoose from 'mongoose';
<% } -%>