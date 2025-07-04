---
inject: true
to: ./src/swagger/routes/<%=  nameDash %>.swagger.ts
after: // required property
---
<% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
<<<<<<< HEAD
<% if (!isOptional) { -%>
'<%= property %>', 
<% }  -%>
=======
  <% if (!isOptional) { -%>
    <% if (kind === 'reference' && (referenceType === 'oneToOne' || referenceType === 'manyToOne')) { -%>
      '<%= property %>Id',
    <% } else { -%>
      '<%= property %>', 
    <% } -%>
  <% } -%>
>>>>>>> origin/main
<% } -%>
