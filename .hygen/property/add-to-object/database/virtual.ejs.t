---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
before: export default model<I<%= name %>>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= name %>Schema.virtual('<%= object %>.<%= property %>', {
    localField: '<%= object %>.<%= property %>Id',
    foreignField: '_id',
    ref: '<%= type %>',
    justOne: true,
    match: { deletedAt: null },
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= name %>Schema.virtual('<%= object %>.<%= h.inflection.pluralize(property) %>', {
    localField: '<%= object %>.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids',
    foreignField: '_id',
    ref: '<%= type %>',
    match: { deletedAt: null },
  });
  <% } -%>
<% } -%>
