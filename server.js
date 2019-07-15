// Dependencies.
var express = require('express');
// Axios is a promise based HTTP client for the browser and node.js.  https://www.npmjs.com/package/axios
var axios = require('axios');
// Cheerio is implementation of core jQuery for the server. https://cheerio.js.org/
var cheerio = require('cheerio');
// Handlebars view engine for Express.  https://www.npmjs.com/package/express-handlebars
var exphbs = require('express-handlebars');
// Mongoose is a MongoDB object modeling tool.  https://mongoosejs.com/
var mongoose = require('mongoose');

// Require all models.
var db = require("./models");
var PORT = (3000);

// Initialize Express.
var app = express();

// Configure middleware
// Serve static files.
app.use(express.static('public'));
// Parse incoming request with urlencoded payload.
app.use(express.urlencoded({extended: true}));
// Parse incoming request with JSON payloads.
app.use(express.json());

// Connect to MongoDB.
mongoose.connect('mongodb://localhost/Scraper', {useNewUrlParser: true});

// Routes
// GET route for scraping New York Times website.
app.get('/scrape', function(req, res) {
    // Grab html body with axios.
    axios.get('https://www.nytimes.com/').then(function(response) {
        
    });
});
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});