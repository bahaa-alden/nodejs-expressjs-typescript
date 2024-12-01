---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
before: export default
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= name %>Schema.virtual('<%= property %>', {
    localField: '<%= property %>Id',
    foreignField: '_id',
    ref: '<%= Type %>',
    justOne: true,
    match: { deletedAt: null },
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= name %>Schema.virtual('<%= h.inflection.pluralize(property) %>', {
    localField: '<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids',
    foreignField: '_id',
    ref: '<%= Type %>',
    match: { deletedAt: null },
  });
  <% } -%>
<% } -%>
