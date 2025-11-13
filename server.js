// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
app.use(express.json());


// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
console.error('MongoDB connection error:', err);
process.exit(1);
});


// routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);


// serve static frontend
app.use(express.static(path.join(__dirname, 'public')));


// fallback

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));