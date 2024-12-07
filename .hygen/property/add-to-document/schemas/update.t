---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
after:  // <creating-property-update-schema />
---
<% if (isAddToValidation) { -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: zodObjectId.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: zodObjectId.array().optional()<% if (isNullable) { -%>.nullable()<% } -%>,
    <% } -%>
  <% } else if (kind === 'enum') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: z<% if (isArray) {-%>.array( z<% }-%>.nativeEnum(<%= enumType %>)<% if (isArray) {-%>) <% }-%>.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <%} else if (kind === 'object') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: <% if (isArray) {-%>z.array( <% }-%><%= h.inflection.camelize(property, true) %>UpdateSchema<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else { -%>       
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: <% if (isArray) {-%>z.array( <% }-%>z.<%= type %>()<% if (isArray) {-%>) <% }-%><% if (isOptional) { -%>.optional()<% } -%>.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>