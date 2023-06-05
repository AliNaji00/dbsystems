# Readme

## Docker

To run the docker container, install Docker and Docker Compose on your
machine. Then, navigate to this directory and run `docker-compose up` or
`docker-compose up -d` (to run in background) to run the backend. You
can stop it with CTRL-C or `docker-compose  stop`. You can see the
credentials and database name in the docker-compose.yml file. If the init_db.sql file has been changed, you have to delete the database with `docker-compose down -v` and restart the docker container with `docker-compose up`.

## Database

To change the initial database configuration, replace the contents of
the init_db.sql file. Make sure the name
of the database matches the database name in the docker-compose.yml
file.

## Backend

To install all necessary files for the backend, run `npm install`. To start the backend in development mode, run `npm run watch`.
