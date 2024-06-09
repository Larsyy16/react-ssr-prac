import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import App from '../src/App.jsx';
import api from './api.js';

const app = express();
const PORT = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(process.cwd(), 'dist')));

// Use the API routes
app.use('/api', api);

// Server-side rendering
app.get('/*', (req, res) => {
    const appString = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve('./dist/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
