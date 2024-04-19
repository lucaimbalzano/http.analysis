# digitiamo analysis http request - backend

Ho usato reactjs su vite per frontend, fastapi, jwt, e mysql

### Setup virtual environment dependencies

you are at the root of the ./backend project
```
$ python3 -m venv venv
```

## Activate virtual environment

```
Linux
$ python source ./venv/bin/activate
```

### Setup container
```
containerizza backend
$ docker volume create mysql_data_digitiamo_db
$ docker build -t digitiamo-fastapi .
```
containerizza frontend
```
$ cd client
$ docker build -t digitiamo-frontend -f Dockerfile.client .
```
Run Docker-compose
```
$ cd ../backend
$ docker-compose --env-file ./.env up
 --- oppure ---
$ docker-compose up --build
```
to change the style of adminer
```
$ docker cp ./adminer.css $(docker ps -qf "name=digitiamo-adminer"):/var/www/html/
```
### init db
```
You can use under ./utils/CREATE_TABLE.sql
as query to create the table

```

### run server
```
$ uvicorn main:app
```