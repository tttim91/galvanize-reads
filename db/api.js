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
    getBooksByAuthor: function(id) {
        return knex('author').join('book_author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).join('book', function() {
            this.on('book_author.book_id', '=', 'book.id')
        }).where('book_author.author_id', '=', id);
    },
    getGroupedAuthorsByBook: function() {
        return knex('book').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography').join('book_author', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).join('author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).then(function(data) {
            var count = 2;
            var countArray = [];
            for(var i=0; i<data.length;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].title == data[j].title) {
                        data[i]['first_name'+count]=data[j].first_name;
                        data[i]['last_name'+count]=data[j].last_name;
                        data[i]['author_id'+count]=data[j].author_id;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                countArray.push(count);
                count = 2;
                data[i].authors = [];
            }
            for(var i=0; i<countArray.length; i++) {
                for(var j=1; j<countArray[i]; j++) {
                    if(j==1){
                        data[i].authors.push({name:data[i]['first_name']+" "+data[i]['last_name'],id:data[i].author_id});
                    }
                    else {
                        data[i].authors.push({name:data[i]['first_name'+j]+" "+data[i]['last_name'+j],id:data[i]['author_id'+j]});
                    }
                }
            }
            var books = [];
            var page = 1;
            var maxPage = Math.ceil(data.length/9);
            for(var i=0; i<maxPage; i++) {
                books.push(data.slice(i*9, i*9+9))
            }
            return books;
        })
    },
    getGroupedAuthorsByBookSearch: function(query) {
        return knex('book').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography').join('book_author', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).join('author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).where('book.title', 'ilike', '%'+query+'%').then(function(data) {
            var count = 2;
            var countArray = [];
            for(var i=0; i<data.length;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].title == data[j].title) {
                        data[i]['first_name'+count]=data[j].first_name;
                        data[i]['last_name'+count]=data[j].last_name;
                        data[i]['author_id'+count]=data[j].author_id;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                countArray.push(count);
                count = 2;
                data[i].authors = [];
            }
            for(var i=0; i<countArray.length; i++) {
                for(var j=1; j<countArray[i]; j++) {
                    if(j==1){
                        data[i].authors.push({name:data[i]['first_name']+" "+data[i]['last_name'],id:data[i].author_id});
                    }
                    else {
                        data[i].authors.push({name:data[i]['first_name'+j]+" "+data[i]['last_name'+j],id:data[i]['author_id'+j]});
                    }
                }
            }
            return data;
        })
    },
    getGroupedBooksByAuthor: function() {
        return knex('author').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography', 'author.portrait_url').join('book_author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).join('book', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).then(function(data) {
            var count = 2;
            var countArray = [];
            for(var i=0; i<data.length;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].first_name+data[i].last_name == data[j].first_name+data[j].last_name) {
                        data[i]['title'+count]=data[j].title;
                        data[i]['description'+count]=data[j].description;
                        data[i]['book_id'+count]=data[j].book_id;
                        data[i]['cover_url'+count]=data[j].cover_url;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                countArray.push(count);
                count = 2;
                data[i].books = [];
            }
            for(var i=0; i<countArray.length; i++) {
                for(var j=1; j<countArray[i]; j++) {
                    if(j==1){
                        data[i].books.push({title:data[i]['title'],id:data[i].book_id, description:data[i].description, cover_url:data[i].cover_url});
                    }
                    else {
                        data[i].books.push({title:data[i]['title'+j],id:data[i]['book_id'+j], description:data[i]['description'+j], cover_url:data[i]['cover_url']});
                    }
                }
            }
            var authors = [];
            var page = 1;
            var maxPage = Math.ceil(data.length/9);
            for(var i=0; i<maxPage; i++) {
                authors.push(data.slice(i*9, i*9+9))
            }
            return authors;
        })
    },
    getGroupedBooksByAuthorSearch: function(query) {
        return knex('author').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography', 'author.portrait_url').join('book_author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).join('book', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).where('author.first_name', 'ilike', '%'+query+'%').orWhere('author.last_name', 'ilike', '%'+query+'%').then(function(data) {
            var count = 2;
            var countArray = [];
            for(var i=0; i<data.length;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].first_name+data[i].last_name == data[j].first_name+data[j].last_name) {
                        data[i]['title'+count]=data[j].title;
                        data[i]['description'+count]=data[j].description;
                        data[i]['book_id'+count]=data[j].book_id;
                        data[i]['cover_url'+count]=data[j].cover_url;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                countArray.push(count);
                count = 2;
                data[i].books = [];
            }
            for(var i=0; i<countArray.length; i++) {
                for(var j=1; j<countArray[i]; j++) {
                    if(j==1){
                        data[i].books.push({title:data[i]['title'],id:data[i].book_id, description:data[i].description, cover_url:data[i].cover_url});
                    }
                    else {
                        data[i].books.push({title:data[i]['title'+j],id:data[i]['book_id'+j], description:data[i]['description'+j], cover_url:data[i]['cover_url']});
                    }
                }
            }
            return data;
        })
    },
    addJoinTable: function(author_id, book_id) {
        return knex('book_author').insert({author_id:author_id, book_id:book_id});
    },
    findNextBookId: function() {
        return knex('book').select('id').orderBy('id', 'desc').limit(1).first()
    },
    findNextAuthorId: function() {
        return knex('author').select('id').orderBy('id', 'desc').limit(1).first()
    },
    getGroupedAuthorsByBookWithGenre: function(genre) {
        return knex('genre').select('book.id as book_id', 'book.title', 'book.description', 'book.cover_url', 'author.id as author_id', 'author.first_name', 'author.last_name', 'author.biography', 'genre.name').join('book', function() {
            this.on('book.genre_id', '=', 'genre.id')
        }).join('book_author', function() {
            this.on('book.id', '=', 'book_author.book_id')
        }).join('author', function() {
            this.on('author.id', '=', 'book_author.author_id')
        }).where('genre.name', '=', genre).then(function(data) {
            var count = 2;
            var countArray = [];
            for(var i=0; i<data.length;i++) {
                for(var j=i+1; j<data.length; j++) {
                    if(data[i].title == data[j].title) {
                        data[i]['first_name'+count]=data[j].first_name;
                        data[i]['last_name'+count]=data[j].last_name;
                        data[i]['author_id'+count]=data[j].author_id;
                        data.splice(j,1);
                        j--;
                        count++;
                    }
                }
                countArray.push(count);
                count = 2;
                data[i].authors = [];
            }
            for(var i=0; i<countArray.length; i++) {
                for(var j=1; j<countArray[i]; j++) {
                    if(j==1){
                        data[i].authors.push({name:data[i]['first_name']+" "+data[i]['last_name'],id:data[i].author_id});
                    }
                    else {
                        data[i].authors.push({name:data[i]['first_name'+j]+" "+data[i]['last_name'+j],id:data[i]['author_id'+j]});
                    }
                }
            }
            return data;
        })
    }

}
