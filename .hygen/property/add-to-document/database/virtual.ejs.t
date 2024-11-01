---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
before: export default model<I<%= name %>>
---

<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(name), true) %>Schema.virtual('<%= h.inflection.camelize(h.inflection.singularize(property), true) %>', {
    localField: '<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id',
    foreignField: '_id',
    ref: '<%= type %>',
    justOne: true,
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(name), true) %>Schema.virtual('<%= h.inflection.camelize(h.inflection.pluralize(property), true) %>', {
    localField: '<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids',
    foreignField: '_id',
    ref: '<%= type %>',
  });
  <% } -%>
<% } -%>
