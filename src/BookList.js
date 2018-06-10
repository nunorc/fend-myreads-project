import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component {
  render() {
  	const { books, update, shelf } = this.props
  	
  	if (books.length > 0 ) {
      return (
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book   = {book}
                update = {update}
                shelf  = {shelf}
              />
            </li>
          ))}
        </ol>
      )
    }
    else {
      return null
    }
  }
}

export default BookList
