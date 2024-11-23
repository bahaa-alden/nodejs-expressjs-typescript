---
inject: true
to: src/database/models/<%= name %>.model.ts
after:  \<creating\-property\-interface \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= Type %>['_id'] <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= Type %><% if (isNullable) { -%> | null<% } -%>;
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= property %>Ids<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= Type %>['_id']> <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= Type %>> <% if (isNullable) { -%> | null<% } -%>;
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= enumType %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } else if (kind === 'object') { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= Property %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } else  { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= type %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } -%>