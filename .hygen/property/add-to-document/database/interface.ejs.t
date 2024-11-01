---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
after:  \<creating\-property\-interface \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id<% if (!isAddToDto || isOptional) { -%>?<% } -%>: I<%= type %>['_id'] <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: I<%= type %><% if (isNullable) { -%> | null<% } -%>;
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids<% if (!isAddToDto || isOptional) { -%>?<% } -%>: Array<I<%= type %>['_id']> <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: Array<I<%= type %>> <% if (isNullable) { -%> | null<% } -%>;
  <% } -%>
<% } else { -%>
  <%= property %><% if (!isAddToDto || isOptional) { -%>?<% } -%>: <%= type %> <% if (isNullable) { -%> | null<% } -%>;
<% } -%>