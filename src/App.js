import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    books:  [],
    search: [],
    query:  ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      })
    })
  }

  doSearch(q) {
    if (q) {
    BooksAPI.search(q).then((result) => {
      if (result && Array.isArray(result) && result.length > 0) {
        this.setState({query: q, search: result})
      }
      else {
        this.setState({query: q, search: []}) 
      }
    })
    }
    else {
      this.setState({query: q, search: []}) 
    }
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
              >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={(e) => {this.doSearch(e.target.value)}} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <BookList
                books  = {this.state.search}
                update = {this.update}
                shelf  = 'none'
              />
            </div>
          </div>
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books  = {this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                      update = {this.update}
                      shelf  = 'currentlyReading'
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books  = {this.state.books.filter((book) => book.shelf === 'wantToRead')}
                      update = {this.update}
                      shelf  = 'wantToRead'
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookList
                      books  = {this.state.books.filter((book) => book.shelf === 'read')}
                      update = {this.update}
                      shelf  = 'read'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Search</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
