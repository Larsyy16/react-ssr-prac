import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from '../src/App.jsx'
// import { writeDataToFile } from '../utils.js'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'build')))

app.use(express.json())

const items =[];

app.get('/api/items', (req, res) => {
    res.json(items);
})

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem)
})




app.get('/*', (req, res) => {
    fs.readFile(path.resolve('./public/index.html'), 'utf8', (err,data) => {
        if (err) {
            console.log(err)
            return res.status(500).send('error 500');
        }
        return (
            res.send(data.replace('<div id="root"></div>',
            `<div id="root">
            ${ReactDOMServer.renderToString(<App></App>)}</div>`)
        ))
    })
})

// app.use(express.static(path.resolve(__dirname, '.', 'dist')))

app.listen(PORT, () => console.log('listening port 3000'))