import { books } from '../data/books';

export function getBooks() {
  return books;
}

export function getBookById(bookId) {
  return books.find((book) => book.id === Number(bookId));
}
