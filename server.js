const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const config = require('./Backend/utility/config');
const api = require('./Backend/routes/api');

const app = express();

let mongoUrl = config.MONGODB_URL;

//Connect to DB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(er => console.log('Could not connect to MongoDb...', er));
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* For API */
app.use('/api', api);

/* For Client */
app.use(express.static('Client/build/'))
app.use('*', express.static('Client/build/'))

app.use((req, res, next) => {
    const error = new Error("Url not found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

const port = config.PORT;
app.listen(port, () => console.log(`listening on port  ${port}...`));
