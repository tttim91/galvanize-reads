var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/page/:id', function(req, res, next) {
    if(req.query.authorSearch) {
        Promise.all([db.getGroupedBooksByAuthorSearch(req.query.authorSearch),db.listBooks()])
        .then(function(data) {
            var authors = data[0];
            var book = data[1];
            res.render('author', {data:authors, dataLength: authors.length, book: book});
        })
    } else {
        Promise.all([db.getGroupedBooksByAuthor(),db.listBooks()])
        .then(function(data) {
            var authors = data[0][req.params.id];
            var authorArrays = data[0];
            var book = data[1];
            res.render('author', {data:authors, authorArrays:authorArrays, dataLength: authors.length, book: book});
        })
    }
});

router.post('/', function(req, res, next) {
    res.redirect('/author/page/0')
})

router.get('/addAuthor', function(req, res, next) {
    db.listBooks().then(function(books) {
        res.render('addAuthor', {books:books});
    })
});

router.post('/addAuthor', function(req, res, next) {
    var author = {first_name:req.body.first_name,
                last_name:req.body.last_name,
                biography:req.body.biography,
                portrait_url:req.body.portrait_url
                }
    var book = req.body.book;
    db.findNextAuthorId().then(function(id) {
        return db.addAuthor(author).then(function() {
            return db.addJoinTable(id.id+1, book)
            .then(function() {
                res.redirect('/author/page/0')
            })
        })
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
        res.redirect('/author/page/0');
    })
})

router.get('/:id/edit', function(req, res, next) {
    db.getAuthorById(req.params.id).then(function(author) {
        res.render('editAuthor', {author: author});
    })
});

router.post('/:id/edit', function(req, res, next) {
    db.editAuthor(req.params.id, req.body).then(function() {
        res.redirect('/author/page/0');
    })
})

router.get('/:id', function(req, res, next) {
    Promise.all([db.getAuthorById(req.params.id),db.getBooksByAuthor(req.params.id)])
        .then(function(data) {
        var author = data[0];
        var books = data[1];
        res.render('authorDetail', {author:author, books:books});
    })
})

module.exports = router;
