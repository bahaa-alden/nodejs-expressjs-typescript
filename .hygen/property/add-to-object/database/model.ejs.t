---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
after: // \<creating\-property\-object\-<%= object %> \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '<%= Type %>',
    },
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: '<%= Type %>',
        default: []
      }]
    },
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= property %>:<% if (isArray) {-%>[ <% }-%>{
      type: String,
      enum: Object.values(<%= EnumType %>),
    }<% if (isArray) {-%>] <% }-%>
    ,
<% } else { -%>
    <%= property %>:{
       <% if (kind === 'primitive') { -%>
      <% if (type === 'string') { -%>
      type: <% if (isArray) {-%> [ <% }-%>String<% if (isArray) {-%>] <% }-%>,
      <% if (isText) { -%>
       index: 'text',
      <% } -%>

      <% } else if (type === 'number') { -%>
      type: <% if (isArray) {-%> [ <% }-%>Number<% if (isArray) {-%>] <% }-%>,
    <% } else if (type === 'boolean') { -%>
      type: <% if (isArray) {-%> [ <% }-%> Boolean<% if (isArray) {-%>] <% }-%>,
      <% } -%>
      <% }-%>
      <% if (isArray) {-%>default: []<% }-%>
    }
    ,
<% } -%>