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
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= name %>Schema.virtual('<%= object %>.<%= h.inflection.pluralize(property) %>', {
    localField: '<%= object %>.<%= property %>Ids',
    foreignField: '_id',
    ref: '<%= type %>',
  });
  <% } -%>
<% } -%>
