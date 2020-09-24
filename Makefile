#
# Linux users can enjoy this simple interface to run the app :-)
#

start-hasura:
	docker-compose up -d hasura
	docker-compose up migrations
	docker-compose logs -f hasura

start-app:
	(cd frontend && npm i && npm start)

start-console:
	(cd services/migrations && hasura console)