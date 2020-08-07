import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/book");
  },
  
  // Saves books to the database
  postBooks: function(bookData) {
    return axios.post("/api/book", bookData);
  },

  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/book/" + id);
  }
};
