# syntax=docker/dockerfile:1

FROM node:22

RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

COPY src ./src/
COPY public ./public/
COPY prisma ./prisma/
COPY .eslintrc.json ./
COPY next.config.mjs ./
COPY package.json ./
COPY package-lock.json ./
COPY prisma.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY tsconfig.json ./

RUN npm install
RUN npx next telemetry disable

EXPOSE 3000
CMD ["npm", "run", "dev"]