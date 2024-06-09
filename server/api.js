import express from 'express';
import { writeDataToFile } from '../utils';
import path from 'path';
import fs from 'fs';

const router = express.Router();
let items = []; // In-memory data storage

// Read initial data from a file
const loadDataFromFile = () => {
    try {
        const data = fs.readFileSync(path.join(process.cwd(), 'server', 'items.json'), 'utf8');
        items = JSON.parse(data);
    } catch (err) {
        console.error('Error reading data from file:', err);
        items = [];
    }
};

// Initialize items from file
loadDataFromFile();

// Read items
router.get('/items', (req, res) => {
    res.json(items);
});

// Create an item
router.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    writeDataToFile('items.json', items); // Write updated items to file
    res.status(201).json(newItem);
});

// Update an item
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    items[id] = updatedItem;
    writeDataToFile('items.json', items); // Write updated items to file
    res.json(updatedItem);
});

// Delete an item
router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter((_, index) => index !== parseInt(id, 10));
    writeDataToFile('items.json', items); // Write updated items to file
    res.status(204).end();
});

export default router;
