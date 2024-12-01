---
inject: true
to: ./src/swagger/routes/<%=  nameDash %>.swagger.ts
after: // create property example
---
<% if(!hiddenSwagger){ -%>
<% if (kind === 'primitive' && type === 'date') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>'2024-11-24T16:35:04.438Z'<% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'primitive' && type === 'string') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>'<%= example %>'<% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'primitive' && type !== 'string' && type !=='date') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%><%= example %><% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'enum') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>'<%= enumValue.split(" ")[0] %>'<% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'reference' ) { -%>
<% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
<%= property %>Id: '673c40cd59e293827f79e398',
<% } -%>
<% if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: ['673c40cd59e293827f79e398','673c40cd59e293827f79e399'],
<% } -%>
<% } -%>
<% if (kind === 'local')  {-%> 
   <%= property %>: {
    ar: "",
    en: ""
   },
<% } -%>
<% if (kind === 'object' ) { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%> {
// create property example <%= property %>
} <% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% } -%>