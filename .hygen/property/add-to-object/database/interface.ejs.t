---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
after: // \<creating\-property\-interface\-<%= object %> \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= Type %>['_id'] <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= Type %><% if (isNullable) { -%> | null<% } -%>;
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= Type %>['_id']> <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= Type %>> <% if (isNullable) { -%> | null<% } -%>;
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= EnumType %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } else  { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= type %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } -%>