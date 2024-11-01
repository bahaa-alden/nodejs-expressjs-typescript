---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
after:  // <creating-property-update-schema />
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: zodObjectId.optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: zodObjectId.array().optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>