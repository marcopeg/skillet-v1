#
# Linux users can enjoy this simple interface to run the app :-)
#

start:
	docker-compose up -d hasura
	docker-compose up migrations
	(cd app && npm i && npm start)

stop:
	docker-compose down

migrate:
	docker-compose up migrations

hasura:
	docker-compose up -d hasura
	docker-compose up migrations
	docker-compose logs -f hasura

app:
	(cd app && npm i && npm start)

console:
	(cd services/migrations && hasura console)

logs:
	docker-compose logs -f

logs-hasura:
	docker-compose logs -f hasura

prod-start:
	docker-compose -f docker-compose.prod.yml up

prod-stop:
	docker-compose -f docker-compose.prod.yml down