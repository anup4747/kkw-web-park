# College Parking System
This is a web and mobile application designed to manage parking slots for a college, catering to admins, security guards, and faculty members. The system allows faculty to book parking slots remotely, security to verify bookings, and admins to manage users and slots. Built with a client-server architecture using React.js for the frontend, Node.js for the backend, and Firebase for authentication and data storage.
Project Structure
The project is divided into two main directories:

Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v16 or higher): Required for running both client and server.  https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi

npm (comes with Node.js): For package management.

Git: For cloning the repository.

Firebase Account: Set up a Firebase project for authentication and database (Firestore/Realtime Database).

## File Structure

client/: Contains the React.js frontend for web and mobile interfaces.

server/: Contains the Node.js backend for API services and Firebase integration.

## Installation Steps

1. Clone the Repository

Clone the project from the GitHub repository to your local machine

```
git clone https://github.com/anup4747/kkw-web-park
cd kkw-web-park
```

3. Install Node.js
   
If not already installed, download and install Node.js from nodejs.org. Verify installation:

```
node -v
npm -v
```
4. Install Client Dependencies

Navigate to the client directory and install the required packages for the React.js frontend:

```
cd client
npm install
```
5. Install Server Dependencies

Navigate to the server directory and install the required packages for the Node.js backend:

```
cd server
npm install
```

6. Start the Frontend

From the client directory, start the React.js development server:

```
cd client
npm run dev
```

The frontend will run at http://localhost:3001

7. Start the Backend

From the server directory, start the Node.js backend:

```
cd server
npm run build
npm start
```

The backend will run at http://localhost:3000.

## Usage:

Admins: Access the admin dashboard to manage users, parking slots, and view reports.

Faculty: Log in to book parking slots and view booking history.

Security: Use the interface to verify bookings via QR codes or vehicle details and monitor slots.

Ensure both client and server are running simultaneously for full functionality.


Open Source Contributions
We welcome contributions from the open-source community! To contribute:
