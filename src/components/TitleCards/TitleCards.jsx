import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, apiURL, movies }) => {

  const apiUrl = import.meta.env.VITE_OMDB_API_KEY;

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (apiURL) {
          const response = await fetch(apiURL);
          const data = await response.json();
          setApiData(data.Search || []); 
        } else if (movies) {
          const fetchedMovies = await Promise.all(
            movies.map(async (movieTitle) => {
              const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiUrl}`);
              return await response.json();
            })
          );
          setApiData(fetchedMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      cardsRef.current.addEventListener('wheel', handleWheel);
    };

    fetchMovies();
  }, [apiURL, movies]);

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((movie, index) => (
          <Link to={`/player/${movie.imdbID}`} className='card' key={index}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title.split(" ").slice(0, 5).join(" ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
