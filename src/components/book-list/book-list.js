import React, { Component } from 'react';
import BookListItem from '../book-list-item';

import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';
import {bindActionCreators} from 'redux';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)}/>
            </li>
          );
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart}/>;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return { books, loading, error };
};

// without bindActionCreators:
/*
const mapDispatchToProps = (dispatch, { bookstoreService }) => {

  return {
    // OLD VER: fetchBooks: fetchBooks(bookstoreService, dispatch)
    fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  };
};
*/

const mapDispatchToProps = (dispatch, { bookstoreService }) => {

  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart
  }, dispatch);
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
