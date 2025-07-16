# syntax=docker/dockerfile:1

FROM node:22
ENV NODE_ENV=production
ENV PATH=$NODE_PATH/.bin:$PATH


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
COPY docker/context/run.sh ./
COPY docker/context/wait-for.sh ./

RUN mkdir -p /opt/frontend/static && \
    apt-get update && \
    apt-get --assume-yes install netcat-traditional

RUN NODE_ENV=development
RUN npx next telemetry disable

RUN chmod +x /opt/frontend/run.sh
RUN chmod +x /opt/frontend/wait-for.sh

EXPOSE 3000
CMD ["./run.sh"]