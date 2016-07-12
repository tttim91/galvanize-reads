
exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', function(table) {
          table.increments();
          table.string('title');
          table.integer('genre_id').references('id').inTable('genre').onDelete('cascade');
          table.text('description');
          table.text('cover_url');
      })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
