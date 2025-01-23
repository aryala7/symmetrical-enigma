FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "run","dev"]