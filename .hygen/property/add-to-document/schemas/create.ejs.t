---
inject: true
to: src/schemas/<%= nameDash %>.schema.ts
after:  // <creating-property-create-schema />
---
<% if (isAddToValidation) { -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
      <%= property %>Id: objectId<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
      <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: objectId.array()<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
    <% } -%>
<% } else if(kind === 'local') { -%>
  <%= h.inflection.camelize(property, true) %>: localString<% if (isArray) {-%>.array()<% } -%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
<% } else if (kind === 'enum') { -%>
    <%= property %>: z<% if (isArray) {-%>.array( z<% }-%>.nativeEnum(<%= EnumType %>)<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
<% } else if (kind === 'object') { -%>
    <%= property %>: <% if (isArray) {-%>z.array( <% }-%><%= property %>CreateSchema<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
<% }  else if(type === 'date') { -%>
  <%= h.inflection.camelize(property, true) %>: stringToDate<% if (isArray) {-%>.array()<% } -%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
<% } else { -%>
    <%= property %>: <% if (isArray) {-%>z.array( <% }-%>z.<%= type %>()<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>
