---
inject: true
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
at_line: 0
skip_if: <% if (kind === 'enum') { -%>import { type <%= EnumType %><% } else if (kind === 'fromTo') { -%>import { endOfDay, startOfDay<% } else { -%><%= true %><% } -%>
---
<% if (kind === 'enum') { -%>
  import { <%= EnumType %> } from './../../utils/enum';
<%  } else if (kind === 'fromTo') { -%>
  import { endOfDay, startOfDay } from 'date-fns';
<% } -%>


