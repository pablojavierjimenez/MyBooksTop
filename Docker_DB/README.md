# MariaDB + phpMyAdmin con Docker Compose

- [**MariaDB - Docu**](https://mariadb.org/documentation/)
- [**PhpMyAdmin - Docu**](https://www.phpmyadmin.net/docs/)
- [**MariaDB on DockerHub**](https://hub.docker.com/_/mariadb)
- [**PhpMyAdmin on DockerHub**](https://hub.docker.com/_/phpmyadmin)

## Comandos útiles

```bash
# Levantar los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs solo de MariaDB
docker-compose logs -f db

# Ver logs solo de phpMyAdmin
docker-compose logs -f phpmyadmin

# Detener los servicios
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! elimina los datos)
docker-compose down -v

# Conectarse a MariaDB desde el host
mysql -h localhost -P 3306 -u test-user -p
# Contraseña: testPass

# Conectarse como root desde el host
mysql -h localhost -P 3306 -u root -p
# Contraseña: rootPass

# Conectarse directamente al contenedor de MariaDB
docker exec -it mariadb-db mysql -u test-user -p
```

## Variables de entorno (.env)

### Configuración de MariaDB

- **MARIADB_ROOT_PASSWORD**: Contraseña del usuario root de MariaDB (obligatoria)
- **MARIADB_USER**: Usuario adicional de MariaDB que se creará automáticamente
- **MARIADB_PASSWORD**: Contraseña del usuario adicional
- **MARIADB_DATABASE**: Nombre de la base de datos que se creará automáticamente al iniciar
- **DB_NAME**: Nombre del contenedor de MariaDB

### Configuración adicional

- **DB_HOST**: Host de la base de datos (localhost para conectarse desde el host)
- **DB_PORT**: Puerto interno de MariaDB (3306 por defecto)

### Puertos de exposición al host

- **MARIADB_HOST_PORT**: Puerto en el host para acceder a MariaDB (3306 por defecto)
- **PHPMYADMIN_HOST_PORT**: Puerto en el host para acceder a phpMyAdmin (8082 por defecto)

## Acceso a phpMyAdmin

1. Accede a http://localhost:8082
2. phpMyAdmin se conecta automáticamente al servidor MariaDB
3. Inicia sesión con:
   - **Usuario**: `test-user` (o `root` para acceso completo)
   - **Contraseña**: `testPass` (o `rootPass` si usas root)

## Configuración de volúmenes

### Opción actual (carpeta en el host):

```yaml
volumes:
  - ./db/mariadb:/var/lib/mysql
```

Los datos se guardan en la carpeta `./mariadb` de tu proyecto.

### Opción alternativa (volumen de Docker):

```yaml
volumes:
  - mariadb-db:/var/lib/mysql
```

Los datos se guardan en un volumen gestionado por Docker. Requiere declarar el volumen al final del archivo:

```yaml
volumes:
  mariadb-db:
```

## Características de MariaDB

MariaDB es un fork de MySQL con las siguientes características:

- **Compatible con MySQL**: Sintaxis y comandos idénticos
- **Open Source**: Totalmente libre, sin restricciones de licencia
- **Rendimiento**: Optimizaciones de rendimiento adicionales
- **Motores de almacenamiento**: Más opciones que MySQL (Aria, ColumnStore, etc.)
- **Desarrollo activo**: Actualizaciones más frecuentes que MySQL

## Diferencias entre MariaDB y MySQL

| Característica            | MariaDB          | MySQL              |
| ------------------------- | ---------------- | ------------------ |
| Licencia                  | GPL 100%         | GPL + Propietaria  |
| Desarrollo                | Comunidad        | Oracle Corporation |
| Compatibilidad            | Alta con MySQL   | Alta con MariaDB   |
| Motores de almacenamiento | Más opciones     | Estándar           |
| JSON                      | Soporte completo | Soporte completo   |

## Diferencias clave con PostgreSQL

1. **Puerto por defecto**: MariaDB/MySQL usa el puerto `3306` en lugar de `5432`
2. **Variables de entorno**:
   - `MARIADB_ROOT_PASSWORD` - Contraseña del usuario root (obligatoria)
   - `MARIADB_DATABASE` - Crea automáticamente una base de datos al iniciar
   - `MARIADB_USER` y `MARIADB_PASSWORD` - Crea un usuario adicional con permisos en la BD
3. **Bind volume**: `./mariadb:/var/lib/mysql` (en lugar de postgresql)
4. **phpMyAdmin** en lugar de pgAdmin - Herramienta de administración web específica para MySQL/MariaDB

## Ventajas de phpMyAdmin

- **Conexión automática**: Se configura con variables de entorno, no requiere configuración manual
- **Interfaz familiar**: La herramienta más usada para administrar MySQL/MariaDB
- **Funciones completas**: Gestión de bases de datos, tablas, usuarios, importación/exportación
- **Diseñador visual**: Permite crear diagramas ER de las bases de datos
- **Búsqueda global**: Busca en todas las tablas y bases de datos

## Notas importantes

- El directorio `./mariadb` se creará automáticamente la primera vez que ejecutes `docker-compose up`
- phpMyAdmin se conecta automáticamente al contenedor `db` mediante el nombre del servicio
- El usuario `test-user` tiene permisos completos sobre la base de datos `world-db`
- El usuario `root` tiene acceso completo a todas las bases de datos
- Para producción, considera usar volúmenes de Docker en lugar de bind mounts
- Cambia las contraseñas en el archivo `.env` antes de usar en producción
- Si prefieres MySQL, cambia `image: mariadb:10.11` por `image: mysql:8.0` en el docker-compose
- Puedes usar el cliente `mysql` para conectarte a MariaDB (son compatibles)
