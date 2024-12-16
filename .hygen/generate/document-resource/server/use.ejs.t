---
inject: true
to: "./src/server.ts"
after: //ROUTES
---
this.app.use('/api/v1/<%= h.inflection.pluralize(nameDash) %>', <%= name %>Routes.router);