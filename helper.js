

module.exports = {
  findGenreId: function(genre, list) {
    for (var i = 0; i < list.length; i++) {
      if (genre === list[i].name) {
        return list[i].id
      }
    }
  },
  findLocation: function(name, list) {
    for (var i = 0; i < list.length; i++) {
      if (name === list[i].name) {
        return list[i].id
      }
    }
}

}
