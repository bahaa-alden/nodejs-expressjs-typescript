---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
after:  // <creating-property-create-schema />
---
<% if (isAddToValidation) { -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: zodObjectId<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: zodObjectId.array()<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
    <% } -%>
  <% } else if (kind === 'enum') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: z.nativeEnum(<%= enumType %>)<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } else { -%>    
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: z.<%= type %>()<% if (isOptional) { -%>.optional()<% } -%><% if (isNullable) { -%>.nullable()<% } -%>,
  <% } -%>
<% } -%>