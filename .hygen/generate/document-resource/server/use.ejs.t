---
inject: true
to: "./src/server.ts"
after: //ROUTES
---
this.app.use('/api/v1/<%= h.inflection.pluralize(name) %>', <%= name %>Routes.router);