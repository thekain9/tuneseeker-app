import React, { useState, useEffect } from 'react';      // I am importing the React library, along with the useState and useEffect hooks.
import { useParams, useNavigate } from 'react-router-dom'; // I am importing hooks from the 'react-router-dom' library for routing purposes.
import 'bootstrap/dist/css/bootstrap.min.css';          // I am importing the Bootstrap CSS framework for styling.
import '../styles/searchResults.css';                    // I am importing local CSS styles specific to this component.

const SearchResults = () => {
  const { term, media } = useParams();                   // I am extracting 'term' and 'media' parameters from the route using the 'useParams' hook.
  const [results, setResults] = useState([]);            // I am setting up a state variable 'results' to hold search results. Initially, it's an empty array.
  const [loading, setLoading] = useState(true);          // I am setting up a state variable 'loading' to track the loading status. Initially set to 'true'.
  const [favourites, setFavourites] = useState([]);      // I am setting up a state variable 'favourites' to hold favourite items. Initially, it's an empty array.

  const navigate = useNavigate();                        // I am setting up a function called 'navigate' using the 'useNavigate' hook for programmatically navigating.

  useEffect(() => {
// Fetch search results
    setLoading(true);                                    // I am setting the 'loading' state to true indicating the fetch process has started.
    fetch(`http://localhost:8080/api/search/${term}/gb/${media}`)
      .then((response) => response.json())               // I am converting the received response to a JSON object.
      .then((data) => {
        console.log('API Response:', data);              // I am logging the API response data.
        setResults(data.results);                        // I am updating the 'results' state with the fetched data.
        setLoading(false);                               // I am setting the 'loading' state to false indicating the fetch process has completed.
      })
      .catch((error) => {
        console.error('Error fetching data:', error);    // I am logging errors that might occur during fetching data.
        setLoading(false);                               // Even if there's an error, I am setting the 'loading' state to false.
      });


// Fetch favourites
    fetch('http://localhost:8080/favourites')
      .then((response) => response.json())               // I am converting the received response to a JSON object.
      .then((data) => {
        setFavourites(data);                             // I am updating the 'favourites' state with the fetched data.
      })
      .catch((error) => {
        console.error('Error fetching favourites:', error); // I am logging errors that might occur during fetching favourites.
      });

  }, [term, media]);                                     // I am ensuring the useEffect hook runs again only when 'term' or 'media' changes.

  const isInFavourites = (item) => favourites.some((favorite) => favorite.trackId === item.trackId); // I am defining a function to check if an item is already in the 'favourites'.

  const toggleFavourites = (item) => {
    if (isInFavourites(item)) {
      // Remove item from favourites
      fetch(`http://localhost:8080/favourites/${item.trackId}`, {
        method: 'DELETE'
      })
      .then(() => {
        const updatedFavourites = favourites.filter((favorite) => favorite.trackId !== item.trackId); // I am creating a new list excluding the current item.
        setFavourites(updatedFavourites);              // I am updating the 'favourites' state with the updated list.
      })
      .catch(error => {
        console.error('Error removing item from favourites:', error); // I am logging errors that might occur during removal.
      });
    } else {
      // Add item to favourites
      fetch('http://localhost:8080/favourites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),                     // I am converting the item to a JSON string to send in the request.
      })
      .then(() => {
        setFavourites([...favourites, item]);           // I am updating the 'favourites' state by appending the new item.
      })
      .catch(error => {
        console.error('Error adding item to favourites:', error); // I am logging errors that might occur during the addition.
      });
    }
  };


  return (
    <div className="search-results-container custom-styles">
      <h2>Search Results...</h2>
      <button onClick={() => navigate('/favourites')}>View favourites</button>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <ul className="result-list">
          {results.map((result) => (
            result.trackId && (
              <li key={result.trackId} className="custom-list-item">
                <h3>Artist name:</h3>
                <p>{result.artistName}</p>
                <h3>Title:</h3>
                <p>{result.trackName ? result.trackName : 'Not listed :('}</p>
                <h3>Visit the artist:</h3>
                {result.artistViewUrl ? (
                  <a href={result.artistViewUrl} target="_blank" rel="noopener noreferrer">
                    {result.artistViewUrl}
                  </a>
                ) : (
                  <p>Not listed :(</p>
                )}
                <button onClick={() => toggleFavourites(result)}>
                  {isInFavourites(result) ? 'Remove from favourites' : 'Add to favourites'}
                </button>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;









