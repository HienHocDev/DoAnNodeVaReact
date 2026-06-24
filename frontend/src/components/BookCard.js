import BookCover from './BookCover';
import RatingStars from './RatingStars';
import { formatCurrency } from '../utils/formatCurrency';

function BookCard({ book, onOpenBook }) {
  return (
    <article className="book-card">
      {book.discount ? <span className="discount-badge">-{book.discount}%</span> : null}
      <button className="book-card__cover" type="button" onClick={() => onOpenBook(book.id)}>
        <BookCover book={book} />
      </button>
      <button className="book-card__title" type="button" onClick={() => onOpenBook(book.id)}>
        {book.title}
      </button>
      <p>{book.author}</p>
      <strong>{formatCurrency(book.price)}</strong>
      <RatingStars rating={book.rating} reviews={book.reviews} />
    </article>
  );
}

export default BookCard;
