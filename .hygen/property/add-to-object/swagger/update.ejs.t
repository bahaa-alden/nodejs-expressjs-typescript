---
inject: true
to: "./src/swagger/routes/<%= nameDash %>.swagger.ts"
after: update properties <%= object %>
---
<% if(!hiddenSwagger){ -%>
<%= property %>: { type: <% if ( isArray) {-%>
'array',items: {type:<% } -%>
<% if (kind === 'primitive') { -%>'<%= type %>',<% 
}else {-%>'string',<% } -%>
<% if (kind === 'enum') 
{-%> enum: [<% enumValue.split(" ").forEach(element => {-%>'<%= element %>',<% }) -%>]  <% } -%>
<% if ( isArray && kind !== 'object') { -%>} <% } -%>
},
<% if ( isArray) { -%> } },<% }  -%>
<% } -%>