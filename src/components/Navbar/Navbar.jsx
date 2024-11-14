import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_icon.svg';
import bell from '../../assets/bell_icon.svg';
import profile from '../../assets/profile_img.png';
import caret from '../../assets/caret_icon.svg';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef();
  
  const apiUrl = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiUrl}`);
          const data = await response.json();
          if (data.Search) {
            setSearchResults(data.Search);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching search data:', error);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    if (query) {
      setSearchActive(true);
    }
  };

  return (
    <div className={`navbar ${searchActive ? 'nav-dark' : ''}`}>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>My List</li>
          <li>Browse by languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div 
          className={`search-container ${searchActive ? 'search-active' : ''}`}
          onClick={() => setSearchActive(true)}
        >
          <img className="search-icon" src={searchIcon} alt="Search" />
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        
        {/* Display Search Results */}
        {searchActive && searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((movie, index) => (
                <li key={index} className="search-result-item">
                  <a href={`/movie/${movie.imdbID}`}>
                    <img
                      className="search-result-image"
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                      alt={movie.Title}
                    />
                    <p>{movie.Title}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p>Children</p>
        <img className="icons" src={bell} alt="Notifications" />
        <div className="navbar-profile">
          <img className="profile" src={profile} alt="Profile" />
          <img src={caret} alt="Caret" />
          <div className="dropdown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
