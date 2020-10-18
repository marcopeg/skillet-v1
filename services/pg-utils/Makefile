tag?=marcopeg/pg-utils
image_version?=1.0.0
pg_version?=12.4
cmd?=ls

test:
	docker build \
		-t ${tag}:${image_version}-${pg_version} \
		--build-arg PG_IMAGE_TAG=${pg_version} \
		--no-cache  .
	docker tag ${tag}:${image_version}-${pg_version} ${tag}:latest

build:
	docker build \
		-t ${tag}:${image_version}-${pg_version} \
		--build-arg PG_IMAGE_TAG=${pg_version} \
		.
	docker tag ${tag}:${image_version}-${pg_version} ${tag}:latest

publish: build
	docker push ${tag}:${image_version}-${pg_version}
	docker push ${tag}:latest

	
run:
	docker run \
		--rm \
		--volume ${PWD}/backups:/backups \
		--env-file .env \
		${tag}:${image_version}-${pg_version} \
		${cmd}
