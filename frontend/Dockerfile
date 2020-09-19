###
### BUILD THE WEBAPP CLIENT
###

FROM node:12.4-alpine AS builder

# NPM Install for building
WORKDIR /usr/src/app
ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
RUN npm install

# Copy source files:
WORKDIR /usr/src/app
ADD src /usr/src/app/src
ADD public /usr/src/app/public

# Define build arguments
ARG REACT_APP_HASURA_URL=${REACT_APP_HASURA_URL}
ARG REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN}
ARG REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID}
ARG REACT_APP_AUTH0_AUDIENCE=${REACT_APP_AUTH0_AUDIENCE}

# Build:
WORKDIR /usr/src/app
RUN npm run build


###
### BUILD THE FRONTEND SERVICE
### We use nginx and jwilder/dockerize to run a dynamic NGiNX configuration capable
### of using runtime environment variables.
###

FROM nginx:mainline-alpine AS runner

# Install Dockerize:
ARG DOCKERIZE_VER
ENV DOCKERIZE_VER ${DOCKERIZE_VER:-v0.6.1}
RUN echo "Dockerize version: ${DOCKERIZE_VER}"
RUN apk --update add curl \
    && curl -LO  https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VER}/dockerize-alpine-linux-amd64-${DOCKERIZE_VER}.tar.gz \
    && tar xfvz dockerize-alpine-linux-amd64-${DOCKERIZE_VER}.tar.gz \
    && mv dockerize /usr/bin/dockerize \
    && apk del curl libcurl libssh2 ca-certificates \
    && rm -rf /var/cache/apk/*

# Copy the webapp artifacts from the build image:
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Add the proxy project
ADD proxy/nginx.conf /nginx.conf.tmpl
ADD proxy/nginx-start.sh /nginx-start.sh
RUN chmod +x /nginx-start.sh

# Start the container
ENV PROXY_PASS ""
CMD ["/nginx-start.sh"]
