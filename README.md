# skill-matrix

## Run it on GitPod

> The easiest way to try this project and to contribute to it is to run it
> via [GitPod](https://gitpod.io).

👉 Just click the button below, login using your GitHub acount -
**it's free for Open Source** - and the entire project will
automagically boot up in your browser. You will use _VSCode_ to explore
the codebase and make your own contribution.

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/marcopeg/skill-matrix)

## Run Local Production

> **NOTE:** if you run this on Windows, please use [Git for Windows](https://gitforwindows.org/).

> Skillet uses ports `9876, 9877` as default settings to serve the App and the Hasura API.
> You can customize those values setting `FRONTEND_PORT=3000` and `HASURA_PORT=8080`

```bash
docker-compose -f docker-copmpose.prod.yml up
```

## Run Local Development

> **NOTE:** if you run this on Windows, please use [Git for Windows](https://gitforwindows.org/).

### Default Ports

Skilled uses the following ports on your host machine:

- `3000` Create React App
- `4000` NodeJS Backend
- `8080` Hasura Backend
- `8081` Adminer (PostgreSQL UI)
- `5432` PostgreSQL

You can change those ports by customizin a `.env` file.

### Using Docker

You can run the entire app using Docker:

```bash
docker-compose up
```

👉 This method is quite simple and you can just start working on the files without having to
set up your system, but it is quite slow. Running CRA inside Docker is tremendously slow.

### Hybrid Docker + Native

This is my preferred method. I usually run all the backend in Docker but I keep the frontend
running on my host's Node interpreter. Much faster.

First start the backend and run the migrations:

```bash
# Manually:
docker-compose up -d hasura
docker-compose up migrations
docker-compose logs -f hasura

# Or with the Make interface
make hasura
```

Then start the frontend project:

```bash
# Manually:
cd app
npm install
npm start

# Or with the Make interface
make app
```

### Hasura Console

The Hasura Console is a great tool to setup your API, but in order to keep stuff aligned
with the production environment, or your fellow developers, it is best to use a combination
of database migrations and metadata.

Use the
[Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/hasura_console.html)
to run the development console that syncs the changes you make to the data model.

```bash
# !!!
# You need to install HasuraCLI before you try those commands.
# https://hasura.io/docs/1.0/graphql/core/hasura-cli/hasura_console.html
# !!!

# Manually:
cd services/migrations
hasura console

# Or with the Make interface
make console
```

## Troubleshooting

### Import backup from S3:

The automatic backup that is stored to S3 contains the following instruction:

```sql
SELECT pg_catalog.set_config('search_path', '', false);
```

You need to change it to:

```sql
SELECT pg_catalog.set_config('search_path', 'public', false);
```
