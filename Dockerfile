FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
ADD . /app
EXPOSE 80
CMD ["npm", "run", "start"]

