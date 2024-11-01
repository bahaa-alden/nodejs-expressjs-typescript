---
inject: true
to: src/database/models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '<%= type %>',
    },
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= property %>: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: '<%= type %>',
        default: []
      }]
    },
  <% } -%>
<% } else { -%>
    <%= property %>: {
      <% if (type === 'string') { -%>
      type: String,
      <% } else if (type === 'number') { -%>
      type: Number,
    <% } else if (type === 'boolean') { -%>
      type: Boolean,
      <% } -%>
    },
<% } -%>