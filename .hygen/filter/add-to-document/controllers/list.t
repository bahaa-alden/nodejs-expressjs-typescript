---
inject: true
to: src/controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.controller.ts
after:  filters
---
  <% if (kind === 'reference') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: req.valid.query.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id,
  <% } else if (kind === 'fromTo') { -%>
    dateFrom: req.valid.query.dateFrom,
    dateTo: req.valid.query.dateTo,
  <% } else { -%>
    <%= h.inflection.camelize(property, true) %>: req.valid.query.<%= h.inflection.camelize(property, true) %>,
  <% } -%>
