#!/bin/sh
set -e

# Ejecutar migraciones
echo "Ejecutando migraciones..."
pnpm run typeorm:migration:run

# Iniciar la aplicación
echo "Iniciando la aplicación..."
pnpm run start:prod
