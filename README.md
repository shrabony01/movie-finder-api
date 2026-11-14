# Movie Finder API(SBA-12)

A RESTful backend API built with Node.js and Express that acts as an intermediary between a client and the external OMDb (Open Movie Database) API. It allows users to search for movies by title and fetch full metadata for a specific movie using its IMDb ID without exposing my private API key.

## How I Built It

I structured the project using an MVC-style layout so routing and business logic stay cleanly separated:

- **`server.js`**: Entry point of the application. Loads environment variables with `dotenv`, initializes the Express server on port `3001`, enables JSON formatting, and mounts all movie routes under the `/api` prefix.

- **`routes/movieRoutes.js`**: Uses `express.Router()` to map `GET /search` and `GET /movies/:id` to their corresponding controller functions.

- **`controllers/movieController.js`**: Contains two async controller functions (`searchMovies` and `getMovieDetails`) that validate incoming parameters, make `GET` requests to `http://www.omdbapi.com/` using `axios`, and handle errors with `try...catch` blocks.

- **Security (`.env` & `.gitignore`)**: Stored my personal `OMDB_API_KEY` inside a `.env` file and excluded `.env` and `node_modules/` via `.gitignore` so credentials are never pushed to GitHub.


# API Endpoints & How I Tested Everything
I tested all endpoints and edge cases locally using Postman and the browser:

# Search Movies by Title (200 OK)

Request: GET http://localhost:3001/api/search?title=batman (also tested with harry potter)

Result: Confirmed a 200 OK status and a JSON list of matching movies with each movie's Title, Year, imdbID, Type, and Poster.

# Missing Title Validation (400 Bad Request)

Request: GET http://localhost:3001/api/search (without the title query parameter)

Result: Confirmed the server catches the missing parameter and returns a 400 Bad Request status with {"error": "Title query parameter is required"}.

# Get Movie Details by IMDb ID (200 OK)

Request: GET http://localhost:3001/api/movies/tt0372784

Result: Copied the imdbID from the search results and verified a 200 OK response containing full details for Batman Begins (director, cast, plot, runtime, and ratings).

# Invalid Movie Title or ID (404 Not Found)

Request: GET http://localhost:3001/api/search?title=asdfghjkl999 and GET http://localhost:3001/api/movies/tt0000000

Result: Verified that non-existent searches and invalid IMDb IDs return a 404 Not Found status with a clear JSON error message instead of crashing the server.
