#!/bin/bash

# Carica le variabili d'ambiente dal file .env
set -o allexport
source .env
set +o allexport

# Inizializza il database schema
docker exec -i mysql mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS $MYSQL_DB;

USE $MYSQL_DB;

CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    isbn VARCHAR(13) NOT NULL UNIQUE,
    publicationYear INTEGER,
);
EOF