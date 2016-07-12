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
    },
    getAuthorsByBook: function(id) {
        return knex('book').join('book_author', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).join('author', function() {
            this.on('book_author.author_id', '=', 'author.id')
        }).where('book_author.book_id', '=', id);
    },
    getGroupedAuthorsByBook: function() {
        return knex('book').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography').join('book_author', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).join('author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).then(function(data) {
            console.log(data);
            var count = 2;
            for(var i=0; i<data.length-1;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].title == data[j].title) {
                        console.log("HARDDD EQQQUALLSSS");
                        data[i]['first_name'+count]=data[j].first_name;
                        data[i]['last_name'+count]=data[j].last_name;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                count = 2;
            }
            console.log("HAAAAAIIIII");
            console.log(data);
        })
    }
}
