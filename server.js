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

// Register Handlebars view engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
        // Load html body into cheerio and save it as '$'.
        var $ = cheerio.load(response.data);
        
        // Grab every article tag.
        $('article').each(function(i, element) {
            // Save an empty object to hold data.
            var result = {};

            // Save  href/link, headline, and summary of every article as properties of result object.
            result.link = $(this).find('a').attr('href');
            result.title = $(this).find('h2').children('span').first().text();
            result.summary = $(this).find('div.css-1ez5fsm esl82me1').next().text();

            // Create new Article with result object.
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                console.log(err);
            });
        });

        // Send confirmation to client.
        res.send('Scrape complete');
    });
});

// GET route to get all Articles from db.
app.get('/articles', function(req, res) {
    // Grab every document in Articles collection.
    db.Article.find({}).then(function(dbArticle) {
        // If Articles successfully found, send back to client.
        res.json(dbArticle);
    }).catch(function(err) {
        // If error, send it to client.
        res.json(err);
    });
});

// GET route for getting Article by id.
app.get('/articles/:id', function(req, res) {
    // Query to find Article with matching id and populate it with associated notes.
    db.Article.findOne({_id: req.params.id}).populate('note').then(function(dbArticle) {
        // If Article with matching id successfully found, send back to client.
        res.json(dbArticle);
    }).catch(function(err) {
        // If error, send it to client.
        res.json(err);
    });
});

// Route for saving/updating Article's associated Note.
app.post('/articles/:id', function(req, res) {
    // Create new note, pass it req.body.
    db.Note.create(req.body).then(function(dbNote) {
        // If Note successfully created, find Article with _id matching req.params.id.
        // Associate new Note with Article.
        // {new: true} tells query to return updated Article (returns original by default).
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true}).then(function(dbArticle) {
            // If Article successfully updated, send back to client.
            res.json(dbArticle);
        }).catch(function(err) {
            // If error, send it to client.
            res.json(err);
        });
    })
});
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});