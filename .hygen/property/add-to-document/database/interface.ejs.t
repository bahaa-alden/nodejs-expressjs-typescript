---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
after:  \<creating\-property\-interface \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: I<%= type %>['_id'] <% if (isNullable) { -%> | null<% } -%>;
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: Array<I<%= type %>['_id']> <% if (isNullable) { -%> | null<% } -%>;
  <% } -%>
<% } else { -%>
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: <%= type %> <% if (isNullable) { -%> | null<% } -%>;
<% } -%>