import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Favourites from './components/Favourites';
import './App.css';

function App() {
  const [favourites, setfavourites] = useState([]);

  // Fetch favourites from server when the app component mounts
  useEffect(() => {
      fetch('https://us-central1-mytuneseeker.cloudfunctions.net/api/favourites')
      .then(response => response.json())
      .then(data => {
          setfavourites(data);
      })
      .catch(error => {
          console.error('Error fetching favourites:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<SearchForm />}
          />
          <Route
            path="/favourites"
            element={<Favourites favourites={favourites} setfavourites={setfavourites} />} // Pass favourites and setfavourites directly
          />
          <Route path="/api/search/:term/:country/:media?" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







