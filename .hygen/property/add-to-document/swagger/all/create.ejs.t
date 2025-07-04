---
inject: true
to: "./src/swagger/routes/<%= nameDash %>.swagger.ts"
after: // create property
---

<% if (!hiddenSwagger) { -%>
  <% let propertyName = property; -%>
  <% if (kind === 'reference') { -%>
    <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
      <% propertyName = h.inflection.camelize(h.inflection.singularize(property), true) + 'Id'; -%>
    <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
      <% propertyName = h.inflection.camelize(h.inflection.singularize(property), true) + 'Ids'; -%>
    <% } -%>
  <% } -%>

  <%= propertyName %>: {
    <% if (isArray || (kind==='reference' && referenceType !== undefined && referenceType === 'oneToMany' || referenceType === 'manyToMany')) { -%>
      type: 'array',
      items: {
        type: 
        <% if (kind === 'local') { -%>
          'object',
          properties: {
            ar: { type: 'string' },
            en: { type: 'string' }
          }
        <% } else if (kind === 'primitive') { -%>
          '<%= type %>'
        <% } else if (kind === 'enum') { -%>
          'string',
          enum: [
            <% enumValue.split(" ").forEach(element => { -%>
              '<%= element %>',
            <% }) -%>
          ]
        <% } else if (kind === 'object') { -%>
          'object',
          properties: {
            // create properties <%= property %>
          }
        <% } else { -%>
          'string'
        <% } -%>
      }
    <% } else if (kind === 'local') { -%>
      type: 'object',
      properties: {
        ar: { type: 'string' },
        en: { type: 'string' }
      }
    <% } else if (kind === 'primitive') { -%>
      type: '<%= type %>'
    <% } else if (kind === 'enum') { -%>
      type: 'string',
      enum: [
        <% enumValue.split(" ").forEach(element => { -%>
          '<%= element %>',
        <% }) -%>
      ]
    <% } else if (kind === 'object') { -%>
      type: 'object',
      properties: {
        // create properties <%= property %>
      }
    <% } else { -%>
      type: 'string'
    <% } -%>
  },
<% } -%>
