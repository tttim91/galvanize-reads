var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/page/:id', function(req, res, next) {
    if(req.query.bookSearch) {
        Promise.all([db.getGroupedAuthorsByBookSearch(req.query.bookSearch),db.listAuthors()])
        .then(function(data) {
            var books = data[0];
            var author = data[1];
            res.render('book', {data:books, dataLength: books.length, author: author});
        })
    } else if(req.query.genre) {
        Promise.all([db.getGroupedAuthorsByBookWithGenre(req.query.genre),db.listAuthors()])
        .then(function(data) {
            var books = data[0];
            var author = data[1];
            res.render('book', {data:books, dataLength: books.length, author: author});
        })
    } else {
        Promise.all([db.getGroupedAuthorsByBook(),db.listAuthors()])
        .then(function(data) {
            var books = data[0][req.params.id];
            bookArrays = data[0];
            var author = data[1];
            res.render('book', {data:books, bookArrays:bookArrays, dataLength: books.length, author: author});
        })
    }
});

router.get('/addBook', function(req, res, next) {
    Promise.all([db.getGenres(),db.listAuthors()])
        .then(function(data) {
        var genres = data[0];
        var authors = data[1];
        res.render('addBook', {genres:genres, authors: authors});
    })

});

router.post('/addBook', function(req, res, next) {
    var book = {title:req.body.title,
                genre_id:req.body.genre_id,
                description:req.body.description,
                cover_url:req.body.cover_url
                }
    var author = req.body.author;
    db.findNextBookId().then(function(id) {
        return db.addBook(book).then(function() {
            db.addJoinTable(author, id.id+1)
            .then(function() {
                res.redirect('/book/page/0')
            })
        })
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
        res.redirect('/book/page/0');
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
        res.redirect('/book/page/0');
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
