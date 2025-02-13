FROM mcr.microsoft.com/playwright:v1.30.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

CMD ["node", "server.js"]
