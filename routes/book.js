var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log("Route Reached");
    Promise.all([db.getGroupedAuthorsByBook(),db.listAuthors()])
    .then(function(data) {
        console.log("HELLO")
        var books = data[0];
        var author = data[1];
        // console.log(book);
        console.log("HARD HAMMER")
        res.render('book', {data:books, dataLength: books.length, author: author});
    })
});

router.get('/addBook', function(req, res, next) {
    db.getGenres().then(function(genres) {
        res.render('addBook', {genres:genres});
    })

});

router.post('/addBook', function(req, res, next) {
    db.addBook(req.body).then(function() {
        res.redirect('/book');
    })
})

router.get('/:id/confirmDelete', function(req, res, next) {
    Promise.all([db.getBookById(req.params.id),db.getAuthorsByBook(req.params.id)])
        .then(function(data) {
            var book = data[0];
            var author = data[1];
            res.render('deleteBook', {book: book, author: author});
    })
})

router.get('/:id/delete', function(req, res, next) {
    db.deleteBook(req.params.id).then(function() {
        res.redirect('/book');
    })
})

router.get('/:id/edit', function(req, res, next) {
    db.getGenres().then(function(genres) {
        return db.getBookById(req.params.id).then(function(book) {
            res.render('editBook', {genres:genres, book: book});
        })
    })
});

router.post('/:id/edit', function(req, res, next) {
    db.editBook(req.params.id, req.body).then(function() {
        res.redirect('/book');
    })
})

router.get('/:id', function(req, res, next) {
    Promise.all([db.getBookWithGenre(req.params.id), db.getAuthorsByBook(req.params.id)])
    .then(function(data) {
        var book = data[0];
        var authors = data[1];
        res.render('bookDetail', {book:book, authors:authors});
    })
})

module.exports = router;
