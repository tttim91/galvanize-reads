var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.listAuthors().then(function(authors) {
         res.render('author', {authors: authors});
    })
});

router.get('/addAuthor', function(req, res, next) {
    res.render('addAuthor');
});

router.post('/addAuthor', function(req, res, next) {
    db.addAuthor(req.body).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id/delete', function(req, res, next) {
    db.deleteAuthor(req.params.id).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id/edit', function(req, res, next) {
    return db.getAuthorById(req.params.id).then(function(author) {
        res.render('editAuthor', {author: author});
    })
});

router.post('/:id/edit', function(req, res, next) {
    db.editAuthor(req.params.id, req.body).then(function() {
        res.redirect('/author');
    })
})

router.get('/:id', function(req, res, next) {
    db.getAuthorById(req.params.id).then(function(author) {
        res.render('authorDetail', {author:author});
    })
})

module.exports = router;
