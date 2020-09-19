#!/usr/bin/env sh

echo "Checking on Hasura's healthcheck..."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' ${HASURA_ENDPOINT}/healthz)" != "200" ]]; 
do
    echo "Hasura not yet available, try again in 5..."
    sleep 5;
done

if [ -z "${HASURA_SKIP_MIGRATIONS}" ]
then
    echo "Apply SQL migrations..."
    hasura migrate apply --endpoint ${HASURA_ENDPOINT} --admin-secret ${HASURA_ADMIN_SECRET} --skip-update-check
else
    echo "Skipping migrations"
fi

if [ -z "${HASURA_SKIP_METADATA}" ]
then
    echo "Apply Hasura metadata..."
    hasura metadata apply --endpoint ${HASURA_ENDPOINT} --admin-secret ${HASURA_ADMIN_SECRET} --skip-update-check
else
    echo "Skipping metadata"
fi

if [ -z "${HASURA_SKIP_SEEDS}" ]
then
    echo "Apply SQL seeds..."
    hasura seeds apply --endpoint ${HASURA_ENDPOINT} --admin-secret ${HASURA_ADMIN_SECRET} --skip-update-check
else
    echo "Skipping seeds"
fi


# Do not let the process to end
if [ -z "${HASURA_KEEPALIVE}" ]
then
    echo "Migrations completed, exiting the process."
else
    echo "Migrations completed, keeping the process alive forever."
    while true; do sleep 20; done
fi