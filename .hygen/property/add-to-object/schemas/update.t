---
inject: true
to: src/schemas/<%= nameDash %>.schema.ts
after: // <creating-property-update-schema\-<%= object %> />
---
<% if (isAddToValidation) { -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
    <%= property %>Id: objectId.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: objectId.array().optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } -%>
  <% } else if (kind === 'enum') { -%>
    <%= property %>: z<% if (isArray) {-%>.array( z<% }-%>.nativeEnum(<%= EnumType %>)<% if (isArray) {-%>) <% }-%>.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else { -%>       
    <%= property %>: <% if (isArray) {-%>z.array( <% }-%>z.<%= type %>()<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>