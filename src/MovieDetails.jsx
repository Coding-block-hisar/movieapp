import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const API_KEY = "a3969654"; // Replace with your OMDB API key

const MovieDetails = () => {
  const { id } = useParams(); // Extract the movie ID from the route
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]); // Trigger the effect when the movie ID changes

  return (
    <div className="movie-details-page">
      {loading ? (
        <p>Loading details...</p>
      ) : (
        movieDetails && (
          <div>
            <h2>{movieDetails.Title}</h2>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
            <p>{movieDetails.Plot}</p>
            <p>Rating: {movieDetails.imdbRating}</p>
            <p>Director: {movieDetails.Director}</p>
            <p>Actors: {movieDetails.Actors}</p>
            <p>Released: {movieDetails.Released}</p>
          </div>
        )
      )}
      <button onClick={()=>navigate(-1)}>Go back</button>
    </div>
  );
};

export default MovieDetails;
