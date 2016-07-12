var knex = require("./knex");

module.exports = {
    getGenres: function() {
        return knex('genre').select();
    },
    listBooks: function() {
        return knex('book').join('genre', function() {
            this.on('genre.id', '=', 'book.genre_id')
        });
    },
    addBook: function(body) {
        return knex('book').insert(body);
    },
    deleteInstructor: function(id) {
        return knex('instructor').where('id', '=', id).first().del();
    },
    getStaff: function(id) {
        return knex('instructor').where('id', '=', id)
    }
}
