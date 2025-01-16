#!/bin/bash
set -e

# Esperar hasta que PostgreSQL esté listo
until pg_isready -h "db" -p "${DB_POSTGRES_PORT:-5432}" -U "$POSTGRES_USER"; do
  echo "Esperando a que PostgreSQL esté listo..."
  sleep 1
done

# Crear la base de datos si no existe
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
  SELECT 'CREATE DATABASE $POSTGRES_DB' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$POSTGRES_DB')\gexec
EOSQL