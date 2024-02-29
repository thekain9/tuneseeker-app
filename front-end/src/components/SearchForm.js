import React, { useState } from 'react';  // Import React and useState from 'react' library
import { useNavigate, useEffect } from 'react-router-dom';  // Import useNavigate from 'react-router-dom'
import '../styles/SearchForm.css';  // Import CSS styles
import logo from '../assets/eye.png';

const SearchForm = () => {  // Define the SearchForm functional component
  const [term, setTerm] = useState('');  // Declare state variable 'term' and its setter function
  const [media, setMedia] = useState('all');  // Declare state variable 'media' and its setter function, the default will be "all"
  const navigate = useNavigate();  // Initialise the navigate function using useNavigate hook


  const handleSearch = () => {  // Define the handleSearch function
    if(term.trim()==='') {
      return
    }
    navigate(`/api/search/${term}/gb/${media}`);  // Use navigate to redirect to a search URL
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="search-page">
      <div className='title-container'>
        <h1 className="title">TUNESEEKER</h1>
      </div>
      <img className='image-2' src={logo}/>
      <div className="search-bar">
      <div className='search-bar-container'>
        <div className="search-input">
            <input
            className='custom-input'
              type="text"
              placeholder="Search content"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <select
              className='custom-select'
              value={media}
              onChange={(e) => setMedia(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music</option>
              <option value="musicVideo">Music Video</option>
              <option value="audiobook">Audiobook</option>
              <option value="shortFilm">Short Film</option>
              <option value="tvShow">TV Show</option>
              <option value="software">Software</option>
              <option value="ebook">Ebook</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <div className='search-button-container'>
          <button onClick={handleSearch} className='search-button'>Search</button>
        </div>
  
      </div>
    </div>
  );
};

export default SearchForm;


