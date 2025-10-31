# Favorite Movies List

A full-stack web application for managing and tracking your favorite movies. Built with React, Node.js, Express, and Material-UI.

## Project Structure

The project is divided into two main parts:

### Backend (`/backend`)

A Node.js/Express server that handles the API endpoints and database operations.

- **Tech Stack:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - Other key dependencies:
    - cors (Cross-Origin Resource Sharing)
    - helmet (Security middleware)
    - morgan (HTTP request logger)
    - dotenv (Environment variables)

### Frontend (`/favorites-frontend`)

A React-based single-page application built with Vite and styled using Material-UI components.

- **Tech Stack:**
  - React 18
  - Vite (Build tool)
  - Material-UI (MUI)
  - Axios (HTTP client)
  - Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanjaiis/FavoriteMoviesList.git
   cd FavoriteMoviesList
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with your configuration (if required)

3. **Set up the frontend:**
   ```bash
   cd ../favorites-frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
   The server will start on the default port (usually 3000)

2. **Start the frontend development server:**
   ```bash
   cd favorites-frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

## Features

- Add movies to your favorites list
- View all favorite movies in a table format
- Infinite scroll functionality for large lists
- Material-UI components for a modern look and feel
- Responsive design
- Error handling and loading states
- RESTful API endpoints

## Project Structure Details

### Backend Structure
```
backend/
├── controllers/
│   └── entriesController.js    # Movie entry control logic
├── middleware/
│   └── errorHandler.js         # Error handling middleware
├── models/
│   └── Entry.js               # Movie entry data model
├── routes/
│   └── entries.js             # API route definitions
├── entries.json               # Sample/seed data
├── index.js                  # App entry point
└── server.js                 # Express server configuration
```

### Frontend Structure
```
favorites-frontend/
├── src/
│   ├── api/
│   │   └── entriesAPI.js      # API integration
│   ├── components/
│   │   ├── EntryForm.jsx      # Movie entry form
│   │   └── EntryTable.jsx     # Movies display table
│   ├── hooks/
│   │   └── useInfiniteScroll.js # Custom scroll hook
│   ├── App.jsx                # Main application component
│   └── main.jsx              # Application entry point
└── vite.config.js            # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.