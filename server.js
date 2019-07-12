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

// Initialize Express.
var app = express;
