import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import '../index.css';
import { List, ListItem } from "../components/list";
import "../index"


function SavePage() {

  const [book, setBook] = useState("");
  
  useEffect(() => {
    deleteBook();
  }, []);

  // Deletes a book form the database and the form
function deleteBook(id) {
  API.deleteBook(id)
    .then(res => loadBooks())
    .catch(err => console.log(err));
};

useEffect(() => {
  loadBooks();
}, []);

function loadBooks() {
  // Get saved books from the database
  API.getBooks()
    .then(res =>
      setBook(res.data)
    )
    .catch(err => console.log(err));
};
  

  return (
    <div className="container">
      <nav className="nav">
        <h3>Google Book Search</h3>
        <a className="nav-link" href="/">Search</a>
        <a className="nav-link" href="/save">Save</a>
      </nav>
      
      <div className="row" id="bookRes">
        {book.length ? (
          <List>
            {result.map(book => (
              <ListItem>
                <div className="row">
                  <div className="col-3">
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                  </div>
                  <div className="col-6">
                    {book.volumeInfo.title} by {book.volumeInfo.authors}
                    <p>Synopsis: <br />
                    {book.volumeInfo.description}
                    </p>
                  </div>
                  <div className="col-3">
                    <a href={book.volumeInfo.infoLink} target="_blank">
                      <button type="button" className="btn btn-secondary">View</button>
                    </a>
                    <a href="/save">
                      <button type="button" className="btn btn-success">Save</button>
                    </a>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results To Display</h3>
          )}
      </div>
    </div>
  );
}
export default SavePage;
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

const rootElement = document.getElementById("root");
ReactDOM.render(<SavePage />, rootElement);
