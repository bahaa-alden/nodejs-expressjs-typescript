---
inject: true
<<<<<<< HEAD
to: "./src/swagger/routes/users.swagger.ts"
=======
to: "./src/swagger/routes/user.swagger.ts"
>>>>>>> origin/main
after: // create property
---
<% if (name === 'user') { -%>
<% if(!hiddenSwagger){ -%>
<%= property %>: { type: <% if ( isArray) {-%>
'array',items: {type:<% } -%>
<% if (kind === 'primitive') { -%>'<%= type %>',<% 
}else if (kind !== 'object'){-%>'string',<% } -%>
<% if (kind === 'enum') 
{-%> enum: [<% enumValue.split(" ").forEach(element => {-%>'<%= element %>',<% }) -%>]  <% } -%>
<% if ( isArray && kind !== 'object') { -%>} <% } -%>
<% if (kind !== 'object') {  -%>},<% }  -%>
<% if (kind === 'object') {  -%>
'object',properties: {
<<<<<<< HEAD
//  create  properties <%= property %>
=======
// create  properties <%= property %>
>>>>>>> origin/main
}   
<% if ( isArray) { -%> } <% } -%> },<% }  -%>
<% } -%>
<% } -%>