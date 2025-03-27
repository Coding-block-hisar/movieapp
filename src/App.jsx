import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MovieDetails from "./MovieDetails"; // Import the MovieDetails component
import "./App.css";

const API_KEY = "a3969654"; // Replace with your OMDB API key

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch random movies on initial load
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=movie&apikey=${API_KEY}&page=1`
        );
        setMovies(response.data.Search);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  // Handle search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        setMovies(response.data.Search);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
      setLoading(false);
    } else {
      // Fetch random movies when search query is cleared
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?s=movie&apikey=${API_KEY}&page=1`
          );
          setMovies(response.data.Search);
        } catch (error) {
          console.error("Error fetching movies", error);
        }
        setLoading(false);
      };

      fetchMovies();
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Movie App</h1>
        <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
        
        {/* Use Routes instead of Switch in React Router v6 */}
        <Routes>
          {/* Route for the homepage */}
          <Route
            path="/"
            element={
              <div className="movie-list">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  movies?.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))
                )}
              </div>
            }
          />

          {/* Route for movie details */}
          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
