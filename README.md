# Expense Tracker

## Overview
Expense Tracker is a full-stack application that helps users log and track their expenses. The application features filtering, categorization, and total expense calculation within a date range.

## Tech Stack
* __Frontend__: React, Material UI

* __Backend:__ Node.js, Express.js

* __Database:__ MongoDB

## Features
* Add and view expenses

* Filter expenses by category and date

* Calculate total expenses within a date range

## Setup Instructions

* Clone the repository in your system

* Frontend setup
```sh
# Go to the client folder
cd client

# Install dependencies
npm install

# Start the server
npm start 
```

* Backend setup
```sh
# Go to the server folder
cd server

# Install dependencies
npm install
```

* Environment variables setup
```sh
# Go to the server folder
cd server

# create a .env file with this data
MONGO_URI=your_mongodb_connection_string
PORT=8080 

# Start the server
npm run dev
```
* Open in Browser
Navigate to http://localhost:3000 to access the application.

