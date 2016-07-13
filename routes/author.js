var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    Promise.all([db.getGroupedBooksByAuthor(),db.listBooks()])
    .then(function(data) {
        var authors = data[0];
        var book = data[1];
        console.log("About to render page")
        res.render('author', {data:authors, dataLength: authors.length, book: book});
    })
    // db.listAuthors().then(function(authors) {
    //      res.render('author', {authors: authors});
    // })
});

router.get('/addAuthor', function(req, res, next) {
    res.render('addAuthor');
});

router.post('/addAuthor', function(req, res, next) {
    db.addAuthor(req.body).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id/confirmDelete', function(req, res, next) {
    Promise.all([db.getAuthorById(req.params.id),db.getBooksByAuthor(req.params.id)])
        .then(function(data) {
        var author = data[0];
        var books = data[1];
        res.render('deleteAuthor', {author: author, books:books});
    })
})

router.get('/:id/delete', function(req, res, next) {
    db.deleteAuthor(req.params.id).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id/edit', function(req, res, next) {
    db.getAuthorById(req.params.id).then(function(author) {
        res.render('editAuthor', {author: author});
    })
});

router.post('/:id/edit', function(req, res, next) {
    db.editAuthor(req.params.id, req.body).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id', function(req, res, next) {
    Promise.all([db.getAuthorById(req.params.id),db.getBooksByAuthor(req.params.id)])
        .then(function(data) {
        var author = data[0];
        var books = data[1];
        console.log(books);
        res.render('authorDetail', {author:author, books:books});
    })
})

module.exports = router;
