---
inject: true
to: src/database/models/<%=h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
after: // \<creating\-property\-interface\-<%= object %> \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= h.inflection.capitalize(type) %>['_id'] <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= h.inflection.capitalize(type) %><% if (isNullable) { -%> | null<% } -%>;
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids<% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= h.inflection.capitalize(type) %>['_id']> <% if (isNullable) { -%> | null<% } -%>;
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: Array<I<%= h.inflection.capitalize(type) %>> <% if (isNullable) { -%> | null<% } -%>;
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= enumType %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } else if (kind === 'object') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: I<%= h.inflection.capitalize(property) %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } else  { -%>
  <%= property %><% if (!isAddToValidation || isOptional) { -%>?<% } -%>: <%= type %><% if (isArray) {-%> [ ]<% }-%> <% if (isNullable) { -%> | null<% } -%>;
<% } -%>