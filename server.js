const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

// Mw parser
app.use(express.json());

// Db config
const db = require('./keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the DB');
    })
    .catch(e => console.log(e));

// Use routes
app.use('/api/items', items);

// Serve static assests if on production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));