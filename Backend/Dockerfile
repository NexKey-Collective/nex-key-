FROM node:22-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY Backend/package.json Backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node Backend/src ./src
RUN mkdir -p /app/.cache && chown node:node /app/.cache
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
