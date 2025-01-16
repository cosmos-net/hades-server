FROM node:20

RUN npm install -g pnpm \
    && apt-get update \
    && apt-get install -y dos2unix \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Valores por defecto en caso de que no existan variables definidas
ENV DB_POSTGRES_HOST=${DB_POSTGRES_HOST:-"localhost"}
ENV DB_POSTGRES_PORT=${DB_POSTGRES_PORT:-"5432"}
ENV DB_POSTGRES_USER=${DB_POSTGRES_USER:-"root"}
ENV DB_POSTGRES_PASS=${DB_POSTGRES_PASS:-"toor"}
ENV DB_POSTGRES_NAME=${DB_POSTGRES_NAME:-"hades"}
ENV DB_POSTGRES_SSL=${DB_POSTGRES_SSL:-"false"}
ENV DB_POSTGRES_SYNC=${DB_POSTGRES_SYNC:-"false"}
ENV DB_POSTGRES_AUTO_LOAD=${DB_POSTGRES_AUTO_LOAD:-"false"}
ENV DB_POSTGRES_RUN_MIGRATIONS=${DB_POSTGRES_RUN_MIGRATIONS:-"true"}
ENV DB_POSTGRES_LOGGING=${DB_POSTGRES_LOGGING:-"true"}
ENV DB_POSTGRES_MIGRATIONS_TABLE_NAME=${DB_POSTGRES_MIGRATIONS_TABLE_NAME:-"migrations"}
ENV NATS_HOST=${NATS_HOST:-"nats-server"}
ENV NATS_PROTOCOL=${NATS_PROTOCOL:-"nats"}
ENV NATS_PORT_INT=${NATS_PORT_INT:-"4222"}
ENV NATS_PORT_EXT=${NATS_PORT_EXT:-"4223"}
ENV NATS_URL=${NATS_URL:-"nats://nats-server:4222"}
ENV PORT=${PORT:-"3002"}

WORKDIR /app

COPY pnpm-lock.yaml package.json tsconfig.json nest-cli.json ormconfig.ts ./
RUN pnpm install

COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN dos2unix /app/entrypoint.sh && chmod +x /app/entrypoint.sh && npm run build

EXPOSE 3002

CMD ["bash", "/app/entrypoint.sh"]