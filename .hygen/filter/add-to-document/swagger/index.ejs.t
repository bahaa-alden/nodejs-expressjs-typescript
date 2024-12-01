---
inject: true
to: src/swagger/routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.swagger.ts
after: filters
---
<% if (kind === 'reference') { -%>
 *       - in: query
 *         name: <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id
 *         schema:
 *           type: string
 *         description: filter for <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id field
<% } else if (kind === 'fromTo') { -%>
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *         description: from date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *         description: to date
<% } else if (kind === 'enum') { -%>
 *       - in: query
 *         name: <%= h.inflection.camelize(property, true) %>
 *         schema:
 *           type: string
 *         description: filter for  <%= h.inflection.camelize(property, true) %> field
<% } else { -%>
 *       - in: query
 *         name: <%= h.inflection.camelize(property, true) %>
 *         schema:
 *           type: <%= type %>
 *         description: filter for  <%= h.inflection.camelize(property, true) %> field
<% } -%>
