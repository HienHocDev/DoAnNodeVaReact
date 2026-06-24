function BookCover({ book, size = 'medium' }) {
  return (
    <div
      className={`book-cover book-cover--${size}`}
      style={{ '--cover-color': book.color, '--cover-accent': book.accent }}
    >
      <div className="book-cover__top">{book.author}</div>
      <div className="book-cover__title">{book.title}</div>
      <div className="book-cover__line" />
      <div className="book-cover__bottom">BookNest</div>
    </div>
  );
}

export default BookCover;
