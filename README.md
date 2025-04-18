# Event-Management-Project
# Event PlanPal

The Event PlanPal is a full-stack web application that allows users to explore, book events, and manage their registrations, and Organizers can create and manage their events. The system is built using modern web technologies like React, Node.js, TypeScript, MySQL, and integrates JWT-based authentication.

## Features:

### Organizer Dashboard:
Create and manage events (with fields such as name, location, date, time, description, price, banner image).
Track past and upcoming events.

### User Dashboard:
Search for events by name, location, and date.
View event details, including description, price, and seats.
Book tickets, make payment, and generate booking tickets.

## Technologies Used:

### Frontend:
* React (with TypeScript)
* Vite for development
* External CSS for styling

### Backend:
* Node.js with TypeScript
* Express for server-side functionality
* TypeORM for database interaction with MySQL

### Authentication:
* JWT for user authentication and session management

### Database:
* MySQL to store user data, event information, and bookings

## Installation:
* Install Node JS
* Install MySQL Database

### Steps to Install:
Clone the repository:

```
git clone https://github.com/suba-kannan/Event-Management-Project.git
cd Event-Management-Project
```

Install dependencies for both frontend and backend:

### Frontend:

```
cd frontend
npm install
```

### Backend:

```
cd backend
npm install
```

### Set up the database:
* Create a MySQL database and import the necessary schema.
* Update the database configuration in backend/src/config/data-source.ts.

## Run the application:

### Start the backend:
```
cd backend
npm start
```

### Start the frontend:
```
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173, and the backend API will run at http://localhost:5000.

### Configuration

JWT Secret Key: Ensure to set the JWT secret key in the backend configuration for secure token generation.

## Usage
* Sign Up / Login: Users and organizers can sign up and log in using email and password. 

* Event Exploration: Users can search for and filter events based on various criteria (name, location, date).

* Create Event: Organizers can create events, and edit and delete the created events. Organizers can manage their created events in profile page.

* Event Booking: Users can register for events by selecting the "Register" button on the Register events page. A ticket will be generated and can cancle ticket after successful booking. Users can manage their booked events and cancel them in profile page.

## S3 Bucket Hosting
`http://event-management-host.s3-website.ap-south-1.amazonaws.com`
