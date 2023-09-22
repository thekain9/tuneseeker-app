import React from 'react';
import { useNavigate } from 'react-router-dom';   // Import useNavigate hook
import '../styles/Favourites.css';  

const Favourites = ({ favourites, setfavourites }) => {
  const navigate = useNavigate();  // Call the hook

  const removeFavorite = (trackId) => {
    const updatedfavourites = favourites.filter((item) => item.trackId !== trackId);
    setfavourites(updatedfavourites);
  };

  return (
    <div className="favourites-results-container custom-styles">
      <h2>Favourites</h2>
      
      {/* Button to navigate back to home */}
      <button onClick={() => navigate('/')}>Back Home</button>

      {/* Button to navigate back to the previous page (i.e., search results) */}
      <button onClick={() => navigate(-1)}>Go Back</button>
      
      <ul className="result-list">
        {favourites.map((favorite) => (
          <li key={favorite.trackId} className="custom-list-item">
            <h3>Artist name:</h3>
            <p>{favorite.artistName}</p>
            <h3>Title:</h3>
            <p>{favorite.trackName ? favorite.trackName : 'Not listed :('}</p>
            <h3>Visit the artist:</h3>
            {favorite.artistViewUrl ? (
              <a href={favorite.artistViewUrl} target="_blank" rel="noopener noreferrer">
                {favorite.artistViewUrl}
              </a>
            ) : (
              <p>Not listed :(</p>
            )}
            <button onClick={() => removeFavorite(favorite.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;






