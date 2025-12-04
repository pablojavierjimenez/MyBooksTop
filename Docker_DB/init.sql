-- Crear usuarios adicionales con todos los privilegios
CREATE USER IF NOT EXISTS 'daUser' @'%' IDENTIFIED BY 'dauser_password';

CREATE USER IF NOT EXISTS 'TesterUser' @'%' IDENTIFIED BY 'tester_password';

-- Otorgar todos los privilegios a los nuevos usuarios
GRANT ALL PRIVILEGES ON *.* TO 'daUser' @'%' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON *.* TO 'TesterUser' @'%' WITH GRANT OPTION;

-- Aplicar los cambios de privilegios
FLUSH PRIVILEGES;

-- Usar la base de datos creada por las variables de entorno
USE `${MARIADB_DATABASE_NAME}`;

-- Crear la tabla test_table
CREATE TABLE IF NOT EXISTS test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Poblar la tabla con los nombres de la familia Simpson
INSERT INTO
    test_table (texto)
VALUES ('Homero'),
    ('Marge'),
    ('Bart'),
    ('Lisa'),
    ('Maggie');