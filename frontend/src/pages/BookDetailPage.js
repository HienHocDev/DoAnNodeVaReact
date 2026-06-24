import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import RatingStars from '../components/RatingStars';
import SectionTitle from '../components/SectionTitle';
import { formatCurrency } from '../utils/formatCurrency';

function BookDetailPage({ book, relatedBooks, onOpenBook, onAddToCart, onBuyNow }) {
  return (
    <main className="page-section detail-page">
      <div className="breadcrumb">Trang chu / Sach / {book.category} / {book.title}</div>

      <section className="detail-layout">
        <div className="detail-cover">
          <BookCover book={book} size="large" />
        </div>

        <div className="detail-info">
          <h1>{book.title}</h1>
          <p>Tac gia: <strong>{book.author}</strong></p>
          <p>Nha xuat ban: {book.publisher}</p>
          <p>Nam xuat ban: {book.year}</p>
          <p>So trang: 336</p>
          <RatingStars rating={book.rating} reviews={book.reviews} />

          <div className="detail-price">
            <strong>{formatCurrency(book.price)}</strong>
            <del>{formatCurrency(book.oldPrice)}</del>
            <span>-{book.discount}%</span>
          </div>

          <div className="detail-description">
            <h2>Mo ta sach</h2>
            <p>{book.description}</p>
          </div>

          <div className="quantity-row">
            <span>So luong:</span>
            <button type="button">-</button>
            <strong>1</strong>
            <button type="button">+</button>
            <small>Con 25 san pham</small>
          </div>

          <div className="button-row">
            <button className="btn-primary" type="button" onClick={() => onAddToCart(book.id)}>
              Them vao gio hang
            </button>
            <button className="btn-secondary" type="button" onClick={() => onBuyNow(book.id)}>
              Mua ngay
            </button>
          </div>
        </div>
      </section>

      <section className="service-row">
        <article><strong>Mien phi van chuyen</strong><span>Don hang tu 300k</span></article>
        <article><strong>Doi tra de dang</strong><span>Trong vong 7 ngay</span></article>
        <article><strong>Thanh toan tien loi</strong><span>Nhieu hinh thuc</span></article>
      </section>

      <section>
        <SectionTitle title="Sach lien quan" />
        <div className="book-grid">
          {relatedBooks.map((item) => (
            <BookCard key={item.id} book={item} onOpenBook={onOpenBook} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookDetailPage;
