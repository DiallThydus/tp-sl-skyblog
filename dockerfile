FROM node:19.4.0

# Build api

WORKDIR /src
RUN npm install
RUN npm run build

# Build front
WORKDIR /front/src
RUN npm install -g serve
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
