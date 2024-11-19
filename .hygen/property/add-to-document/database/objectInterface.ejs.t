---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
before: export interface
---
<% if (kind === 'object') { -%>

export interface I<%= h.inflection.capitalize(property) %> extends MongooseDocument {
  // <creating-property-interface-<%= h.inflection.camelize(property, true) %> />
}
<% }-%>
