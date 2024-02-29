import React from 'react';
import { useNavigate } from 'react-router-dom';   // Import useNavigate hook
import '../styles/Favourites.css';  
import MenuSide from './MenuSide';

const Favourites = ({ favourites, setfavourites }) => {
  const navigate = useNavigate();  // Call the hook

  const removeFavorite = (trackId) => {
    const updatedfavourites = favourites.filter((item) => item.trackId !== trackId);
    setfavourites(updatedfavourites);
  };

  return (
    <div className="search-results-container">
    <div className='container-menu'>
      <div className='menu-side'>
        <MenuSide url={-1} buttonName='Go Back' />
      </div>
    </div>
    <div className='side-menu'>
    </div>
    
        
        <ul className="result-list">
          {favourites.map((favorite) => (
            favorite.trackId && (
              <div className='custom-list-container'>
          
              <li key={favorite.trackId} className="custom-list-item custom-favourites">
                <div className='content-list-item'>
                  <h3>Artist name:</h3>
                  <p>{favorite.artistName}</p>
                  <h3>Title:</h3>
                  <p>{favorite.trackName ? favorite.trackName : 'Not listed...sorry!'}</p>
                </div>
                <div className='button-list-item'>
                  {favorite.artistViewUrl ? (
                  <button onClick={() => window.open(favorite.artistViewUrl, '_blank')} 
                  rel='noopener noreferrer'
                  className='small-button'>
                  {favorite.artistViewUrl ? 'View Artist' : 'Not listed'}
                  </button>) : ('Not listed')
                  }
                  <button onClick={() => removeFavorite(favorite.trackId)}
                  className='small-button'>Remove</button>
                </div>
              </li>
              </div>
            )
          ))}
        </ul>
  
    </div>
  );
};

export default Favourites;






