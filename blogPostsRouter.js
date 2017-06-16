const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


function lorem() {
  return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, '
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
    'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
    'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
    'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}


BlogPosts.create("Rivers and Roads", "Far too often in life, I've foraged through forest and valley in search of the 'The Road Less Traveled'.  I'm learning I only need to follow the current river or road until it's end.  Enjoy this road.  Why seek the other when the current is perfect?", "Shea Stott", "June 11, 2017");
BlogPosts.create("Go!", "To go is in it's infinitive form.  Don't allow yourself to dwell long in its preterite form.", "Shea Stott", "June 12, 2017");
BlogPosts.create("Eek the Cat!", lorem(), "Sheaniqua", "February 21, 1984");

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  
  const requiredFields = ["title", "content", "authorName", "publishDate"];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message);      
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.authorName, req.body.publishDate);
  res.status(201).json(item)
});

router.put("/:id", jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
  for(let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]; 
    if(!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message)
    }
  }
  if(req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match.`;
    console.error(message);
    return res.status(400).send(message); 
  }
  console.log("Updating blog post with id ${req.params.id}");
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content, 
    author: req.body.author, 
    publishDate: req.body.date
  });
  res.status(204).end();
});



router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;










