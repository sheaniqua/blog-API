const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogPosts = require('.models');

const jsonParser = bodyParser.json();

const app = express();

//log the http layer:

app.use(morgan('common'));

blogPosts.create("Rivers and Roads", "Far too often in life, I've foraged through forest and valley in search of the 'The Road Less Traveled'.  I'm learning I only need to follow the current river or road until it's end.  Enjoy this road.  Why seek the other when the current is perfect?", "Shea Stott", "June 11, 2017");
blogPosts.create("Go!", "To go is the in it's infinitive form.  Don't allow yourself to dwell long in its preterite form.", "Shea Stott", "June 12, 2017");
