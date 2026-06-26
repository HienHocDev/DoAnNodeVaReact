import BookCover from './BookCover';
import RatingStars from './RatingStars';
import { formatCurrency } from '../utils/formatCurrency';

function BookCard({ book, onOpenBook, onAddToCart }) {
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
      <div className="book-card__price">
        <strong>{formatCurrency(book.price)}</strong>
        <del>{formatCurrency(book.oldPrice)}</del>
      </div>
      <RatingStars rating={book.rating} reviews={book.reviews} />
      {onAddToCart && (
        <button className="book-card__cart" type="button" onClick={() => onAddToCart(book.id)}>
          Thêm vào giỏ
        </button>
      )}
    </article>
  );
}

export default BookCard;
