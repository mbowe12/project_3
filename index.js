const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// serve static files from the 'public' directory
app.use(express.static('public'));

// serve JavaScript files
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// read albums data from JSON file
const albumsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'albums.json'), 'utf8'));

// add id number to each album
const albums = albumsData.map((album, index) => ({ ...album, id: index + 1 }));

// route for getting a random album
app.get('/albums/random', (req, res) => {
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    res.json(randomAlbum);
});

// route for individual album data
app.get('/api/albums/:id', (req, res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if (!album) {
        return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
});

// route for individual album pages
app.get('/albums/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'album.html'));
});

// route to serve the main HTML file for any unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
