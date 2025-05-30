---
inject: true
to: src/schemas/<%= nameDash %>.schema.ts
before: const <%= h.inflection.camelize(name, true) %>IdSchema
---
<% if (kind === 'object') { -%>
const <%= property %>CreateSchema = z.object({
  // <creating-property-create-schema-<%= property %> />

});
export type I<%= Property %>CreateSchema = TypeOf<typeof <%= property %>CreateSchema>;

const <%= property %>UpdateSchema = z.object({
  // <creating-property-update-schema-<%= property %> />
});
export type I<%= Property %>UpdateSchema = TypeOf<typeof <%= property %>UpdateSchema>;
<% }-%>