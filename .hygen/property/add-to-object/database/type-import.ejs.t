---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
at_line: 0
skip_if: <% if (kind === 'reference') { -%>import { I<%= h.inflection.capitalize(type) %><% } else if (kind === 'enum') { -%>import { <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'reference') { -%>
  import { I<%= h.inflection.capitalize(type) %> } from './<%= h.inflection.transform(type, ['underscore', 'dasherize']) %>.model';
<% } else if (kind === 'enum') { -%>
  import { <%= enumType %> } from './../../utils/enum';
<% } -%>