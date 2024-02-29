// I'm importing the necessary modules to setup my Express server.
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const app = express();
const db = admin.firestore();

// I'm importing the 'cors' library to handle Cross-Origin Resource Sharing on my server.
const cors = require('cors');

// I'm importing 'node-fetch' to make server-side requests.
const fetch = require('node-fetch');

// Setting up middleware:

// I'm enabling CORS for all routes with default settings.
app.use(cors());

// I'm using 'body-parser' to parse incoming JSON payloads.
app.use(bodyParser.json());

// I'm using 'helmet' to add some headers that help secure my app.
app.use(helmet());

// Define route handler for the root path
app.get('/', (req, res) => {
    res.send('Welcome to MyTuneSeeker API');
  });
  

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
app.get('/favourites', async (req, res) => {
    try {
        const favouritesRef = db.collection('your_collection');
        const snapshot = await favouritesRef.get();
        const favourites = [];
        snapshot.forEach(doc => {
            favourites.push(doc.data());
        });
        res.json(favourites);
    } catch (error) {
        res.status(500).send('Error retrieving favourites');
    }
});

app.post('/favourites', async (req, res) => {
    try {
        const newFavorite = req.body;
        const favouritesRef = db.collection('your_collection');
        
        // Check if item is already in favourites
        const snapshot = await favouritesRef.where('trackId', '==', newFavorite.trackId).get();
        if (!snapshot.empty) {
            res.status(409).send('Item already in favourites');
            return;
        }

        await favouritesRef.add(newFavorite);
        res.status(201).send('Item added to favourites');
    } catch (error) {
        res.status(500).send('Error saving to favourites');
    }
});

app.delete('/favourites/:trackId', async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const favouritesRef = db.collection('your_collection');
        
        // Check if item exists in favourites
        const snapshot = await favouritesRef.where('trackId', '==', trackId).get();
        if (snapshot.empty) {
            res.status(404).send('Item not found in favourites');
            return;
        }

        snapshot.forEach(async doc => {
            await doc.ref.delete();
        });

        res.status(200).send('Item removed from favourites');
    } catch (error) {
        res.status(500).send('Error removing from favourites');
    }
});

exports.api = functions.https.onRequest(app);

