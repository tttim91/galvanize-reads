var find = require('../helper');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('book_author').del()
    .then(function () {
        return knex('author').select()
        .then(function(author) {
            return knex('book').select()
            .then(function(book) {
                return Promise.all([
            // Inserts seed entries
                knex('book_author').insert({author_id: find.findAuthorId("Alex", "Martelli", author), book_id: find.findBookId("Python In A Nutshell", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Allen B.", "Downey", author), book_id: find.findBookId("Think Python", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Bonnie", "Eisenman", author), book_id: find.findBookId("Learning React Native", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Kyle", "Simpson", author), book_id: find.findBookId("You Don't Know JS: ES6 & Beyond", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Kyle", "Simpson", author), book_id: find.findBookId("You Don't Know JS: Scope & Closures", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Kyle", "Simpson", author), book_id: find.findBookId("You Don't Know JS: Async & Performance", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Anna", "Ravenscroft", author), book_id: find.findBookId("Python In A Nutshell", book)}),
                knex('book_author').insert({author_id: find.findAuthorId("Steve", "Holden", author), book_id: find.findBookId("Python In A Nutshell", book)})
                ]);
            });
        });
    });
};
