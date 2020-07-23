FROM node:14

RUN apt update && apt install -y netcat

# Create app directory
WORKDIR /usr/src/app

COPY ./build /tmp/build/

RUN git init \
    && git remote add origin https://github.com/odjhey/node-serve-build \
    && git pull origin master \
    && npm install \
    && mv /tmp/build . 

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080

CMD node server.js


