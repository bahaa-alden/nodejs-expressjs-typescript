---
inject: true
to: "./src/server.ts"
after: //ROUTES
---
this.app.use('/api/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>', <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Routes.router);