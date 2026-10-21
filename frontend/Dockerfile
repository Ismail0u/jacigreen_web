# syntax=docker/dockerfile:1
# Image de DÉVELOPPEMENT uniquement. Le frontend de production est construit et hébergé
# par Vercel (voir docs/operations/docker.md) : aucune image de production n'est fournie.
# Node >= 22.22 est exigé par React Router 8 (voir frontend/package.json « engines »).
FROM node:22-bookworm-slim AS dev
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 5173
CMD ["npm", "run", "dev"]
