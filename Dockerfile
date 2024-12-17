# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir el proyecto
RUN pnpm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar dependencias de producción
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --prod --frozen-lockfile

# Copiar los archivos construidos
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh /app/entrypoint.sh

# Dar permisos de ejecución al script
RUN chmod +x /app/entrypoint.sh

# Exponer el puerto
EXPOSE ${PORT}

# Comando de inicio
CMD ["sh", "/app/entrypoint.sh"]
