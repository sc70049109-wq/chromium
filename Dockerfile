FROM mcr.microsoft.com/playwright:latest

WORKDIR /app

ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
