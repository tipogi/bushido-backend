### Launch the server
`npm run start:dev`

### Bushido Backend Queries
If we want to enter in the apollo client from the browser, we have to deactivate **CORS** in the *bootstrap* procedure.
- GraphQL: localhost:4000/graphql

### Models
In bushido we have two models:
- Market: The responsible to fetch the exchanges offers
- Cards: This model can have two different types, *topic* and *domain*. Topic is the the group that wraps the domains and *domain* is the web page url