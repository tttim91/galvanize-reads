var knex = require("./knex");

module.exports = {
    listBooks: function() {
        return knex('book').join('genre', function() {
            this.on('genre.id', '=', 'book.genre_id')
        });
    },
    addInstructor: function(body) {
        return knex('instructor').insert(body);
    },
    deleteInstructor: function(id) {
        return knex('instructor').where('id', '=', id).first().del();
    },
    getStaff: function(id) {
        return knex('instructor').where('id', '=', id)
    }
}
