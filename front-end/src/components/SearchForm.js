import React, { useState } from 'react';  // Import React and useState from 'react' library
import { useNavigate } from 'react-router-dom';  // Import useNavigate from 'react-router-dom'
import '../styles/SearchForm.css';  // Import CSS styles

const SearchForm = () => {  // Define the SearchForm functional component
  const [term, setTerm] = useState('');  // Declare state variable 'term' and its setter function
  const [media, setMedia] = useState('all');  // Declare state variable 'media' and its setter function, the default will be "all"
  const navigate = useNavigate();  // Initialise the navigate function using useNavigate hook

  const handleSearch = () => {  // Define the handleSearch function
    navigate(`/api/search/${term}/gb/${media}`);  // Use navigate to redirect to a search URL
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="search-page">
      <div className="search-bar">
        <h1 className='search-word'>Search</h1>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search content"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <select
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
          <button onClick={handleSearch} className='search-button'>Search</button>
        </div>
      </div>
      <h1 className="title">TUNESEEKER</h1>
    </div>
  );
};

export default SearchForm;


