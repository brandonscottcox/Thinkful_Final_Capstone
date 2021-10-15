# Capstone: Restaurant Reservation System

This is a fully functioning reservation application that was created for Thinkful's Engineering Immersion program's final capstone project. It uses the following technologies: React.js, Node.js, PostgreSQL, Express.js, & Knex.js

You can view the full deployment of this application here:
https://bcox-front-reservation.herokuapp.com/dashboard

## Dashboard

![](Pictures/Dashboard.PNG)

## Search

![](Pictures/Search.PNG)

## Create Reservation Form

![](Pictures/Reservation.PNG)

## Create Table Form

![](Pictures/Table.PNG)

# API Documention

<hr>

### GET: /reservations?mobile_number=999-999-9999

Returns reservations that match the number query.

### GET: /reservations?date=YYYY-MM-DD

Returns reservations made for that date.

### POST: /reservations

Creates a new reservation

### GET: /reservations/:reservationId

Reads a reservation by reservation_id

### PUT: /reservations/:reservationId

Updates a reservation by reservation_id

### PUT: /reservations/:reservationId/status

Updates the status of a reservation by reservation_id

### GET: /tables

Lists all tables

### POST: /tables

Creates a new table

### PUT: /tables/:table_id/seat

Seats a reservation at a table

### DELETE /tables/:table_id/seat

Finishes an occupied table

##

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. Include your backend connection within `./front-end/.env` (defaults to `http://localhost:5000`).
1. Run `npm install` to install project dependencies.
1. Run `npm run start` to start the server.
