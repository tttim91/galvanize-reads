var knex = require("./knex");

module.exports = {
    listStaff: function() {
        return knex('instructor').select();
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
