var knex = require("./knex");

module.exports = {
    getGenres: function() {
        return knex('genre').select();
    },
    listBooks: function() {
        return knex('book').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'genre.id as genre_id', 'genre.name').join('genre', function() {
            this.on('genre.id', '=', 'book.genre_id')
        });
    },
    addBook: function(body) {
        return knex('book').insert(body);
    },
    deleteBook: function(id) {
        return knex('book').where('id', '=', id).first().del();
    },
    editBook: function(id, body) {
        return knex('book').where('id', '=', id).first().update(body);
    },
    getBookById: function(id) {
        return knex('book').where('book.id', '=', id).first();
    },
    getBookWithGenre: function(id) {
        return knex('book').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'genre.id as genre_id', 'genre.name').join('genre', function() {
            this.on('genre.id', '=', 'book.genre_id')
        }).where('book.id', '=', id).first();
    },
    listAuthors: function() {
        return knex('author').select();
    },
    addAuthor: function(body) {
        return knex('author').insert(body);
    },
    deleteAuthor: function(id) {
        return knex('author').where('id', '=', id).first().del();
    },
    editAuthor: function(id, body) {
        return knex('author').where('id', '=', id).first().update(body);
    },
    getAuthorById: function(id) {
        return knex('author').where('author.id', '=', id).first();
    }
}
