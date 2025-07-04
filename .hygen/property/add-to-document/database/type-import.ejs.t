---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
at_line: 0
skip_if: <% if (kind === 'reference') { -%>import { I<%= Type %><% } else if (kind === 'enum') { -%>import { <%= enumType %><% } else if (kind === 'local') { -%>import { type ILocalString , localStringSchema }<% } else { -%><%= true %><% } -%>
---
<% if (kind === 'reference') { -%>
  import { I<%= Type %> } from './<%= type %>.model';
<% } else if (kind === 'local') { -%>
  import { type ILocalString , localStringSchema } from './../../utils/types'
<% } else if (kind === 'enum') { -%>
  import { <%= EnumType %> } from './../../utils/enum';
<% } -%>
