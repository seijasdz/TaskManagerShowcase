# Task Management REST API

This project is a backend REST API built with Node.js and Express, designed to represent a real-world backend commonly used by startups and growing companies.

## Features

- User registration and login
- Password hashing with bcrypt
- CRUD operations for tasks
- User-based task ownership
- Clean backend architecture
- Error handling and input validation

## Tech Stack

- Node.js
- Express
- SQLite (easily replaceable with PostgreSQL or MySQL)
- REST API
- SQL-based models (no heavy ORM)

## Project Structure

The project follows a clean separation of concerns:
routes → controllers → services → models → database

## Authentication

Authentication is implemented using JWT (JSON Web Tokens) for secure user sessions.

## Database Design

The database uses a simple relational schema:

- users table for authentication data
- tasks table linked to users (one-to-many)

## Use Cases

This backend can be used for:

- MVP backends for startups
- Internal tools
- Task or workflow management systems
- API foundations for further integrations

## Getting Started

Install dependencies:
npm install

Copy .env.example to .env and configure your environment variables.

Run in development mode:
npm run dev

## Health Check

GET /health
