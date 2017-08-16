const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mainRouter = require('../routes/index');
const apiRouter = require('../routes/api');
const logger = require('morgan');

const app = express();

// Set up the logger
app.use(logger('dev'));

// View Engine
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, '../client')));

// Set up routes
app.use('/', mainRouter.router);
app.use('/api', apiRouter.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});