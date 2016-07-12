var findGenreId = require('../helper').findGenreId;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('book').del()
    .then(function () {
        return knex('genre').select()
    })
    .then(function(genres) {
      return Promise.all([
        // Inserts seed entries
        knex('book').insert({title: 'Python In A Nutshell', genre_id:findGenreId("Python", genres), description: "This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg"}),
        knex('book').insert({title: 'Think Python', genre_id:findGenreId("Python", genres), description: "If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg"}),
        knex('book').insert({title: 'Learning React Native', genre_id:findGenreId("Javascript", genres), description: "Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg"}),
        knex('book').insert({title: "You Don't Know JS: ES6 & Beyond", genre_id:findGenreId("Javascript", genres), description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the 'You Don’t Know JS' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg"}),
        knex('book').insert({title: "You Don't Know JS: Scope & Closures", genre_id:findGenreId("Javascript", genres), description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the 'You Don’t Know JS' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/scope_and_closures.jpg"}),
        knex('book').insert({title: "You Don't Know JS: Async & Performance", genre_id:findGenreId("Javascript", genres), description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the 'You Don’t Know JS' series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.", cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/async_and_performance.jpg"})
      ]);
    });
};
