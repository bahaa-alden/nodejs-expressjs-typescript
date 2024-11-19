---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '<%= h.inflection.capitalize(type) %>',
    },
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: '<%= h.inflection.capitalize(type) %>',
        default: []
      }]
    },
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>:<% if (isArray) {-%>[ <% }-%>{
      type: String,
      enum: Object.values(<%= enumType %>),
    }<% if (isArray) {-%>] <% }-%>
    ,
<% } else { -%>
    <%= property %>:<% if (isArray) {-%> [ <% }-%> {
       <% if (kind === 'object') { -%>
      // <creating-property-object-<%= h.inflection.camelize(h.inflection.singularize(property), true) %> />
      <% }-%>
       <% if (kind === 'primitive') { -%>
      <% if (type === 'string') { -%>
      type: String,
      <% if (isText) { -%>
       index: 'text',
      <% } -%>

      <% } else if (type === 'number') { -%>
      type: Number,
    <% } else if (type === 'boolean') { -%>
      type: Boolean,
      <% } -%>
      <% }-%>
    }
    <% if (isArray) {-%>] <% }-%>
    ,
<% } -%>