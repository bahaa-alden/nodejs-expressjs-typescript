---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
after: // <creating-property-update-schema\-<%= object %> />
---
<% if (isAddToValidation) { -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
    <%= property %>Id: zodObjectId.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= property %>Ids: zodObjectId.array().optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } -%>
  <% } else if (kind === 'enum') { -%>
    <%= property %>: z<% if (isArray) {-%>.array( z<% }-%>.nativeEnum(<%= enumType %>)<% if (isArray) {-%>) <% }-%>.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else { -%>       
    <%= property %>: <% if (isArray) {-%>z.array( <% }-%>z.<%= type %>()<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%>.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>