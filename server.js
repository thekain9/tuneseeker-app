const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
// const port = 8080;
const cors = require('cors');
const fetch = require('node-fetch');

const fs = require('fs');
const path = require('path');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());


app.get('/api/search/:term/:country/:media', async (req, res) => {
    const term = req.params.term;
    const media = req.params.media || 'all';

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${term}&country=gb&media=${media}`)
        
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ message: 'Error fetching data from iTunes API' });
        }
    } catch (error) {
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

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


