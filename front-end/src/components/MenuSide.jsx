import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuSide.css';
import logo from '../assets/eye.png';

function MenuSide({url, buttonName}) {

    const [term, setTerm] = useState('');
    const [media, setMedia] = useState('all');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/api/search/${term}/gb/${media}`);
    }
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleSearch()
        }

    }
  return (
    
    <div className='menu'>
        <img className='image' src={logo}/>
        <h2 className='search-results-side-menu'>SEARCH RESULTS</h2>
        <div>
        <input
            className='custom-input-menu-side'
            type="text"
            placeholder="Refine Content"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <select
              className='custom-select-menu-side'
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
        <button onClick={handleSearch} className='search-button-side-menu'>Search</button>
       
        <button onClick={() => navigate('/')} 
        className='search-button-side-menu-2'>Back Home</button>
        <button onClick={() => navigate(url)}
        className='search-button-side-menu-2'>{buttonName}</button>
      
    </div>
      
  )
}

export default MenuSide
