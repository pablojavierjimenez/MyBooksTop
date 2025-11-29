# PostgreSQL + pgAdmin con Docker Compose

- [**Postgres - Docu**](https://www.postgresql.org/docs/)
- [**PgAdmin - Docu**](https://www.pgadmin.org/docs/pgadmin4/9.10/index.html)
- [**Postgres on DockerHub**](https://hub.docker.com/_/postgres)
- [**PgAdmin on DockerHub**](https://hub.docker.com/r/dpage/pgadmin4)

## Comandos útiles

```bash
# Levantar los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs solo de PostgreSQL
docker-compose logs -f db

# Ver logs solo de pgAdmin
docker-compose logs -f pgadmin

# Detener los servicios
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! elimina los datos)
docker-compose down -v

# Conectarse a PostgreSQL desde el host
psql -h localhost -p 5432 -U test-user -d world-db
# Contraseña: testPass

# Conectarse directamente al contenedor de PostgreSQL
docker exec -it postgres-db psql -U test-user -d world-db
```

## Variables de entorno (.env)

### Configuración de PostgreSQL

- **POSTGRES_USER**: Usuario de PostgreSQL (no root, es el usuario principal de la base de datos)
- **POSTGRES_PASSWORD**: Contraseña del usuario de PostgreSQL
- **POSTGRES_DATABASE**: Nombre de la base de datos que se creará automáticamente al iniciar
- **DB_NAME**: Nombre del contenedor de PostgreSQL

### Configuración adicional

- **DB_HOST**: Host de la base de datos (localhost para conectarse desde el host)
- **DB_PORT**: Puerto interno de PostgreSQL (5432 por defecto)

### Puertos de exposición al host

- **POSTGRES_HOST_PORT**: Puerto en el host para acceder a PostgreSQL (5432 por defecto)
- **PGADMIN_HOST_PORT**: Puerto en el host para acceder a pgAdmin (8080 por defecto)

### Configuración de pgAdmin

- **PGADMIN_EMAIL**: Email para iniciar sesión en pgAdmin (usado como nombre de usuario)
- **PGADMIN_PASSWORD**: Contraseña para iniciar sesión en pgAdmin

## Acceso a pgAdmin

1. Accede a http://localhost:8081
2. Inicia sesión con:
   - Email: `admin@admin.com`
   - Contraseña: `adminPass`
3. Para conectar a PostgreSQL desde pgAdmin:
   - Click derecho en "Servers" → "Register" → "Server"
   - **General Tab**:
     - Name: postgres-db (o el nombre que prefieras)
   - **Connection Tab**:
     - Host: `db` (nombre del servicio en docker-compose)
     - Port: `5432`
     - Username: `test-user`
     - Password: `testPass`
     - Save password: ✓

## Configuración de volúmenes

### Opción actual (carpeta en el host):

```yaml
volumes:
  - ./db/postgres:/var/lib/postgresql/data
```

Los datos se guardan en la carpeta `./postgres` de tu proyecto.

### Opción alternativa (volumen de Docker):

```yaml
volumes:
  - postgres-db:/var/lib/postgresql/data
```

Los datos se guardan en un volumen gestionado por Docker. Requiere declarar el volumen al final del archivo:

```yaml
volumes:
  postgres-db:
```

## Diferencias clave con MariaDB/MySQL

1. **Puerto por defecto**: PostgreSQL usa el puerto `5432` en lugar de `3306`
2. **Variables de entorno**:
   - `POSTGRES_USER` - Usuario principal (no existe "root" en PostgreSQL)
   - `POSTGRES_PASSWORD` - Contraseña del usuario principal
   - `POSTGRES_DB` - Crea automáticamente una base de datos al iniciar
3. **Bind volume**: `./db/postgres:/var/lib/postgresql/data` (en lugar de mysql)
4. **pgAdmin** en lugar de phpMyAdmin - Herramienta de administración web para PostgreSQL

## Notas importantes

- El directorio `./db/postgres` se creará automáticamente la primera vez que ejecutes `docker-compose up`
- pgAdmin requiere que configures manualmente la conexión al servidor PostgreSQL la primera vez (ver sección "Acceso a pgAdmin")
- Para producción, considera usar volúmenes de Docker en lugar de bind mounts para mejor rendimiento
- Cambia las contraseñas en el archivo `.env` antes de usar en producción
