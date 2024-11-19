---
inject: true
to: src/schemas/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.schema.ts
before: const <%= h.inflection.camelize(name, true) %>IdSchema
---
<% if (kind === 'object') { -%>
const <%= h.inflection.camelize(property, true) %>CreateSchema = object({
  // <creating-property-create-schema-<%= h.inflection.camelize(property, true) %> />

});
export type I<%= h.inflection.capitalize(property) %>CreateSchema = TypeOf<typeof <%= h.inflection.camelize(property, true) %>CreateSchema>;

const <%= h.inflection.camelize(property, true) %>UpdateSchema = object({
  // <creating-property-update-schema-<%= h.inflection.camelize(property, true) %> />
});
export type I<%= h.inflection.capitalize(property) %>UpdateSchema = TypeOf<typeof <%= h.inflection.camelize(property, true) %>UpdateSchema>;
<% }-%>