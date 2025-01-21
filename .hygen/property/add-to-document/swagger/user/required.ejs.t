---
inject: true
to: "./src/swagger/routes/auth.swagger.ts"
after: // required property
---
<% if (name === 'user') { -%>
<% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
<% if (!isOptional) { -%>
'<%= property %>', 
<% }  -%>
<% } -%>
<% }-%>

