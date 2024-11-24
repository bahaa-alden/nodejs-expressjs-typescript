---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
at_line: 0
skip_if: <% if (kind === 'reference') { -%>import { I<%= Type %><% } else if (kind === 'enum') { -%>import { <%= enumType %><% } else { -%><%= true %><% } -%>
---
<% if (kind === 'reference') { -%>
  import { I<%= Type %> } from './<%= type %>.model';
<% } else if (kind === 'enum') { -%>
  import { <%= EnumType %> } from './../../utils/enum';
<% } -%>
