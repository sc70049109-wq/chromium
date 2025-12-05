FROM playwright/chromium:latest
WORKDIR /app
ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
