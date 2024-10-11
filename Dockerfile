FROM mongo:latest

WORKDIR /app-node

RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

COPY . .

RUN npm install 

EXPOSE 8090
EXPOSE 27017
CMD mongod --fork --logpath /var/log/mongodb.log && npm start
