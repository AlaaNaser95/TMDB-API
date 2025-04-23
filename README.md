# TMDB Movie App (NestJS + MySQL + Docker)

This is a production-ready backend application built with **NestJS**, using **MySQL** as the database, **Im-memory** caching, and fully containerized with **Docker**.

## Project Structure

```
|── src/
│   ├── modules/            # Feature modules (movies, users, auth, etc.)
│   ├── common/             # Common utilities (Dtos, enums, helpers, interceptors)
│   ├── config/             # Configuration handling (env, auth, database)
|   ├── database/            # Database files (entities, migrations,seeders)
|   ├── authentication      # Authentication module with related guards, stratigies and dtos
│   ├── main.ts             # App entry point
│   ├── app.module.ts       # Root module
│   └── ...
├── docker-compose.yml      # Docker Compose setup
├── Dockerfile              # Dockerfile for production
├── .env.example                    # Environment variables
├── start_script.sh                # Startup script for migrations and app start for docker
├── package.json
├── package.lock.json
└── README.md
```

## Features

- TMDB API Integration (fetch and persist popular movie data and genres)
- MySQL database with TypeORM
- In-memory caching (configurable TTL, cache per query)
- Dockerized for production stage
- Seeders and migrations support
- Auto-pagination, filtering, searching for movies list
- Global pagination interceptors
- API Documentation
- Caching big queries less likely to get updated(all movies and genres lists)
- User Authentication using passport to secure APIs that modify and access sensitive data in database.
- Swagger Documentation.

## Prerequisites

To tun the project make sure you have the following:

- [Docker]
- [Docker Compose]

OR

- [Docker-desktop]

## Environment Setup

Create a `.env` file in the root directory based on the .env.example structure:

You have to make sure LOCAL_MYSQL_PORT and LOCAL_APP_PORT are being in use in your local machine.

## Running the App (Docker)

```bash
docker-compose up --build
```

This will:

- Start MySQL containers
- Run migrations and seeders to seed database with first page of TMDB popular movies along with all Genres.
- Start the NestJS app on `http://localhost:8080`

## Steps to use the App

- After running the App, create new user and login to get access token for authentication.
- Make sure to update port according what you provide in .env file.

## API Docs

After running the app, navigate to:

```
http://localhost:8080/api-docs
```

This URL provides the Swagger documentation of the API.
