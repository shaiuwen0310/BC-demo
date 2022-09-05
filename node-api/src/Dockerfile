FROM node:12.22.8

WORKDIR /src/scanfile-node-api
COPY . /src/scanfile-node-api
RUN npm install --production \
	&& npm install pm2 -g --no-optional --production
