# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY pnpm-lock.yaml package.json tsconfig.json nest-cli.json ormconfig.ts ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir el proyecto usando NestJS
RUN pnpm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar bash y curl
RUN apk add --no-cache bash curl

# Descargar wait-for-it.sh
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Copiar dependencias de producción
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --prod --frozen-lockfile

# Instalar ts-node como dependencia de producción (si es necesario)
RUN pnpm add ts-node

# Copiar los archivos construidos y configuraciones
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/ormconfig.ts ./ormconfig.ts
# En caso de que se necesiten scripts en tiempo de ejecución
COPY --from=builder /app/package.json ./package.json

# Copiar entrypoint.sh
COPY entrypoint.sh ./

# Dar permisos de ejecución al script
RUN chmod +x ./entrypoint.sh

# Exponer el puerto
EXPOSE ${PORT}

# Comando de inicio usando entrypoint.sh
CMD ["sh", "/app/entrypoint.sh"]