FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install test dependencies
RUN npm install -D jest @types/jest ts-jest supertest @types/supertest

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]