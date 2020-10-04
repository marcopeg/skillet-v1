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
ADD features /usr/src/app/features
ADD index.js /usr/src/app/index.js

CMD ["node", "index.js"]
