import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { book, update } = this.props

    let thumbnail = 'imgs/default.png'
    if (book && book.imageLinks && book.imageLinks.thumbnail)
    	thumbnail = book.imageLinks.thumbnail

    let authors = []
    if (book && book.authors && book.authors.length > 0)
    	authors = book.authors

    if (book) {
      return (
      	<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
          	  width: 128,
          	  height: 193,
          	  backgroundImage: `url(${thumbnail})`
          	}}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => {update(book, e.target.value)}} value={book.shelf || 'none'}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors.join(', ')}</div>
        </div>
      )
    }
    else {
      return null
    }

  }
}

export default Book
