// I'm importing the necessary modules to setup my Express server.
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
// const port = 8080;  // I've commented out the port number for now. Might use it later.

// I'm importing the 'cors' library to handle Cross-Origin Resource Sharing on my server.
const cors = require('cors');

// I'm importing 'node-fetch' to make server-side requests.
const fetch = require('node-fetch');

// I'm using the 'fs' and 'path' modules. Even though I'm not using them now, I might need them for file operations later.
const fs = require('fs');
const path = require('path');

// Setting up middleware:

// I'm enabling CORS for all routes with default settings.
app.use(cors());

// I'm using 'body-parser' to parse incoming JSON payloads.
app.use(bodyParser.json());

// I'm using 'helmet' to add some headers that help secure my app.
app.use(helmet());

// Here, I've defined a GET route to search for media on the iTunes API.
app.get('/api/search/:term/:country/:media', async (req, res) => {
    // I'm extracting search term and media type from the request parameters.
    const term = req.params.term;
    const media = req.params.media || 'all';  // Default to 'all' if no media type is specified.

    try {
        // I'm sending a request to the iTunes API with the given search term and media type.
        const response = await fetch(`https://itunes.apple.com/search?term=${term}&country=gb&media=${media}`)
        
        // If the response is okay (status 200), I parse the JSON data and send it back.
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            // If there's an issue with the iTunes API response, I return the error status and a message.
            res.status(response.status).json({ message: 'Error fetching data from iTunes API' });
        }
    } catch (error) {
        // If there's an error while trying to fetch from the iTunes API, I send a 500 response.
        res.status(500).json({ message: 'Error fetching data from iTunes API' });
    }
});



//Favourites
app.get('/favourites', (req, res) => {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, 'favourites.json'), 'utf8');
        res.json(JSON.parse(data));
        console.log(`Loggin data: ${data}`);
    } catch (error) {
        
        res.status(500).send('Error retrieving favourites');
    }
});

app.post('/favourites', (req, res) => {
    try {
        const newFavorite = req.body;
        const data = fs.readFileSync(path.resolve(__dirname, 'favourites.json'), 'utf8');
        const favourites = JSON.parse(data);

        // Check if item is already in favourites
        if (favourites.some(item => item.trackId === newFavorite.trackId)) {
            res.status(409).send('Item already in favourites');
            return;
        }

        favourites.push(newFavorite);
        fs.writeFileSync(path.resolve(__dirname, 'favourites.json'), JSON.stringify(favourites, null, 2));
        res.status(201).send('Item added to favourites');
    } catch (error) {
        res.status(500).send('Error saving to favourites');
    }
});

app.delete('/favourites/:trackId', (req, res) => {
    try {
        const trackId = req.params.trackId;
        const data = fs.readFileSync(path.resolve(__dirname, 'favourites.json'), 'utf8');
        const favourites = JSON.parse(data);

        const updatedFavourites = favourites.filter(item => item.trackId !== trackId);
        
        fs.writeFileSync(path.resolve(__dirname, 'favourites.json'), JSON.stringify(updatedFavourites, null, 2));
        res.status(200).send('Item removed from favourites');
    } catch (error) {
        res.status(500).send('Error removing from favourites');
    }
});

module.exports = app; 




