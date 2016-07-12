var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.listBooks().then(function(books) {
         res.render('book', {books: books});
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

module.exports = router;
