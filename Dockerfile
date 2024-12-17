# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias del proyecto
RUN pnpm install

# Copia el resto del código de la aplicación, excluyendo los archivos y directorios especificados en .dockerignore
COPY . .

# Compila la aplicación
RUN pnpm run build

# Verifica que el archivo dist/main.js existe
RUN ls -la /usr/src/app/dist

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE ${PORT}

# Comando para ejecutar las migraciones y luego iniciar la aplicación
CMD ["sh", "-c", "pnpm run migration:run && pnpm run start:prod"]