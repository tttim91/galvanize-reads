

module.exports = {
  findGenreId: function(genre, list) {
        for (var i = 0; i < list.length; i++) {
          if (genre === list[i].name) {
            return list[i].id
          }
        }
    },
    findBookId: function(title, list) {
        for (var i = 0; i < list.length; i++) {
          if (title === list[i].title) {
            return list[i].id
          }
        }
    },
    findAuthorId: function(first_name, last_name, list) {
        for (var i = 0; i < list.length; i++) {
          if (first_name+last_name === list[i].first_name+list[i].last_name) {
            return list[i].id
          }
        }
    },

}
