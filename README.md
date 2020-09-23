# skill-matrix

## Run Local Production

> Skillet uses ports `9876, 9877` as default settings to serve the App and the Hasura API.
> You can customize those values setting `FRONTEND_PORT=3000` and `HASURA_PORT=8080`

```bash
docker-compose -f docker-copmpose.prod.yml up
```

## Run Local Development

First start the backend and run the migrations:

```bash
docker-compose up -d hasura
docker-compose up migrations
```

Then start the frontend project:

```bash
cd frontend
npm install
npm start
```

> **NOTE:** Hasura console is disabled in development. Use the
> [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/hasura_console.html)
> to run the development console that syncs the changes you make to the data model.

```bash
cd services/migrations
hasura console
```
