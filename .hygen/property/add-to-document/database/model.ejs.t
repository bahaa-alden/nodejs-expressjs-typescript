---
inject: true
to: src/database/models/<%= nameDash %>.model.ts
after:  \<creating\-property\-schema \/\>
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
<% } else if (kind === 'local') { -%>
      <%= h.inflection.camelize(property, true) %>: {
        type: <% if (isArray) {-%>[<% }-%>localStringSchema<% if (isArray) {-%>]<% }-%>,
        of: String,
        <% if (isArray) {-%>default: [],<% }-%>
      },
<% } else if (kind === 'enum') { -%>
  <%= property %>: {
      type: <% if (isArray) {-%>[ <% }-%>String<% if (isArray) {-%>] <% }-%>,
      enum: Object.values(<%= EnumType %>),
    }
    ,
<% } else { -%>
    <%= property %>: {
       <% if (kind === 'object') { -%>
      type: <% if (isArray) {-%> [ <% }-%>{
        // <creating-property-object-<%= property %> />
      }<% if (isArray) {-%>] <% }-%>,
      <% }-%>
       <% if (kind === 'primitive') { -%>
      <% if (type === 'string') { -%>
      type: <% if (isArray) {-%> [ <% }-%>String<% if (isArray) {-%>] <% }-%>,
      <% if (isText) { -%>
       index: 'text',
      <% } -%>

      <% } else if (type === 'number') { -%>
      type: <% if (isArray) {-%> [ <% }-%>Number<% if (isArray) {-%>] <% }-%>,
    <% } else if (type === 'boolean') { -%>
      type: <% if (isArray) {-%> [ <% }-%>Boolean<% if (isArray) {-%>] <% }-%>,
    <% } else if (type === 'date') { -%>
          type: <% if (isArray) {-%> [ <% }-%>Date<% if (isArray) {-%>] <% }-%>,
    <% } -%>
   <% }-%>
    <% if (isArray) {-%>default: []<% }-%>
    }
    ,
<% } -%>