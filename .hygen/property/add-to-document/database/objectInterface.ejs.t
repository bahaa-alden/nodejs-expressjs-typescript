---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
before: export interface
---
<% if (kind === 'object') { -%>

export interface I<%= Property %> extends MongooseDocument {
  // <creating-property-interface-<%= property %> />
}
<% }-%>
