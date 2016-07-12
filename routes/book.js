var express = require('express');
var router = express.Router();
var db = require('../db/api');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.listBooks().then(function(books) {
         res.render('book', {books: books});
    })
});

module.exports = router;
