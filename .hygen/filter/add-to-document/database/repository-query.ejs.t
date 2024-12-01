---
inject: true
to: src/database/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
after:  const query
---

<% if(kind === 'reference') { -%>
  if (filter?.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id) {
    query.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id = filter.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id
  }
<% } else if (kind === 'fromTo') { -%>
    if (filter?.dateFrom ?? filter?.dateTo) {
      query.createdAt = {}
      if (filter.dateFrom) {
        query.createdAt.$gte = startOfDay(filter.dateFrom);
      }
      if (filter.dateTo) {
        query.createdAt.$lte = endOfDay(filter.dateTo);
      }
    }
<% } else if (kind === 'primitive' && type === 'boolean') { -%>
  if (typeof filter?.<%= h.inflection.camelize(h.inflection.singularize(property), true) %> === 'boolean') {
    query.<%= h.inflection.camelize(h.inflection.singularize(property), true) %> = filter.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>
  }
<% } else { -%>
  if (filter?.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>) {
    query.<%= h.inflection.camelize(h.inflection.singularize(property), true) %> = filter.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>
  }
<% } -%>
