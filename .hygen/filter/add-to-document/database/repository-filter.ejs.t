---
inject: true
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
after: //filters
---
<% if (kind === 'reference') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id?: string
<% } else if (kind === 'enum') { -%>
    <%= h.inflection.camelize(property, true) %>?: <%= EnumType %>
<% } else if (kind === 'fromTo') { -%>
    dateFrom?: Date
    dateTo?: Date
<% } else if(type === 'date') { -%>
  <%= h.inflection.camelize(property, true) %>?: Date
<% } else { -%>
  <%= h.inflection.camelize(property, true) %>?: <%= type %>
<% } -%>
