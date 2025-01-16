---
inject: true
to: "./src/swagger/routes/<%= nameDash %>.swagger.ts"
after: // required property
---
<% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
<% if (!isOptional) { -%>
'<%= object %>.<%= property %>', 
<% }  -%>
<% } -%>
