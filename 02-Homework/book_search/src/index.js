import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import API from "./components/utils/API"
import { List, ListItem } from "./components/list";





function Search() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    // Add code here to get all books from the database and store them using setBooks
    API.getBooks()
      .then(res =>
        setBook(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book form the database and the form
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

  
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book +
      "&key=AIzaSyC1N08CB95xJ2toeMLKdVtggRC4Hz4g9as&maxResults=10")
      .then(data => {
        console.log(data.data.items[2].volumeInfo.infoLink);
        setResult(data.data.items)
      })
  }

  return (
    <div class="container">
      <nav class="nav">
        <h3>Google Book Search</h3>
        <a class="nav-link" href="/">Search</a>
        <a class="nav-link" href="/save">Save</a>
      </nav>
      <form onClick={handleSubmit}>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
          </div>
          <input type="text" onChange={handleChange}
            class="form-control"
            placeholder="Seach Books" />
        </div>
        <div class="float-right">
          <buttom type="submit" id="searchBtn" className="btn btn-dark">Search</buttom>
        </div>
      </form>
      <div class="row" id="bookRes">
        <h3>Results</h3>
        <List>
          {result.map(book => (
            <ListItem>
              <div class="row" id="bookRes">
                <div class="col-3">
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                </div>
                <div class="col-6">
                  {book.volumeInfo.title} by {book.volumeInfo.authors}
                  <p>Synopsis: <br />
                    {book.volumeInfo.description}
                  </p>
                </div>
                <div class="col-3">
                  <a href={book.volumeInfo.infoLink} target="_blank">
                    <button type="button" class="btn btn-secondary">View</button>
                  </a>
                  <a><button type="button" id="saveBtn" class="btn btn-success" >Save</button></a>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
export default Search;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const rootElement = document.getElementById("root");
ReactDOM.render(<Search />, rootElement);
