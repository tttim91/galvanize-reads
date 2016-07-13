var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/results', function(req, res, next) {
    if(req.query.toggle == "book") {
        Promise.all([db.getGroupedAuthorsByBookSearch(req.query.query),db.listAuthors()])
        .then(function(data) {
            var books = data[0];
            var author = data[1];
            res.render('book', {data:books, dataLength: books.length, author: author});
        })
    } else {
        Promise.all([db.getGroupedBooksByAuthorSearch(req.query.query),db.listBooks()])
        .then(function(data) {
            var authors = data[0];
            var book = data[1];
            res.render('author', {data:authors, dataLength: authors.length, book: book});
        })
    }
})

module.exports = router;
