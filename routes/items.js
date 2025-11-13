const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


// CREATE
router.post('/', async (req, res) => {
try {
const item = new Item(req.body);
const saved = await item.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// READ all
router.get('/', async (req, res) => {
try {
const items = await Item.find().sort({ createdAt: -1 });
res.json(items);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// READ one
router.get('/:id', async (req, res) => {
try {
const item = await Item.findById(req.params.id);
if (!item) return res.status(404).json({ error: 'Not found' });
res.json(item);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// UPDATE
router.put('/:id', async (req, res) => {
try {
const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// DELETE
router.delete('/:id', async (req, res) => {
try {
await Item.findByIdAndDelete(req.params.id);
res.json({ success: true });
} catch (err) {
res.status(500).json({ error: err.message });
}
});


module.exports = router;