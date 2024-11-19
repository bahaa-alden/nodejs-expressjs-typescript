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
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: z.nativeEnum(<%= enumType %>).optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else { -%>       
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: z.<%= type %>().optional()<% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>