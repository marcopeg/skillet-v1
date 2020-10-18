# Dynamically build the Docker image from a custom tag that is
# passed on at build time:
ARG PG_IMAGE_TAG=postgres:12.4
FROM postgres:$PG_IMAGE_TAG

# Retrieve the current Postgres version tag for further utilization within
# the image building process:
ARG PG_IMAGE_TAG=postgres:12.4

# Install needed software:
RUN apt-get update && apt-get install -y unzip awscli

ADD scripts /scripts
RUN chmod -R +x /scripts

VOLUME /backups

# These defaults are from the standard docker setup
# ENV PG_HOST=mssql
# ENV PG_PORT=1433
# ENV PG_USER=SA
# ENV PG_PASSWORD=xxx
# ENV PG_DATABASE=yyy

# How to get data from AWS
ENV AWS_ACCESS_KEY=xxx
ENV AWS_ACCESS_SECRET=yyy
ENV AWS_BUCKET_NAME=xxx
ENV AWS_BUCKET_PATH=xxx

ENTRYPOINT ["/scripts/start.sh"]
CMD [""]
