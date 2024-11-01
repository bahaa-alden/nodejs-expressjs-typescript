---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
at_line: 0
skip_if: <% if (kind === 'reference') { -%>import { I<%= type %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'reference') { -%>
  import { I<%= type %> } from './<%= h.inflection.transform(type, ['underscore', 'dasherize']) %>.model';
<% } -%>