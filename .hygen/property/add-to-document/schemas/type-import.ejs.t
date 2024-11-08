---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
at_line: 0
async: true
skip_if: <% if (kind === 'enum') { -%>import { <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'enum') { -%>
  import { <%= enumType %> } from './../utils/enum';
<% } -%>