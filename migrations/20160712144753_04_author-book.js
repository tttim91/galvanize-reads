
exports.up = function(knex, Promise) {
    return knex.schema.createTable('book_author', function(table) {
        table.increments();
        table.integer('author_id').references('id').inTable('author').onDelete('cascade');
        table.integer('book_id').references('id').inTable('book').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_author');
};
