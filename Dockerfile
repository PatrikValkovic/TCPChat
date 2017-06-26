FROM node:8-alpine
MAINTAINER patrik.valkovic@hotmail.cz

# Set working dir
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install --production

# Copy source codes
COPY . .

# Run server
CMD ["node", "./src"]

EXPOSE 465