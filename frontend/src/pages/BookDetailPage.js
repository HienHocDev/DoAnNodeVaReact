import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import RatingStars from '../components/RatingStars';
import SectionTitle from '../components/SectionTitle';
import { formatCurrency } from '../utils/formatCurrency';

function BookDetailPage({ book, relatedBooks, onOpenBook, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setQuantity(1);
    setActiveTab('description');
  }, [book.id]);

  return (
    <main className="page-section detail-page">
      <div className="breadcrumb">Trang chủ / Sách / {book.category} / {book.title}</div>

      <section className="detail-layout">
        <div className="detail-cover">
          <BookCover book={book} size="large" />
          <span className="stock-note">Sản phẩm chính hãng, còn 25 cuốn</span>
        </div>

        <div className="detail-info">
          <span className="detail-category">{book.category}</span>
          <h1>{book.title}</h1>
          <RatingStars rating={book.rating} reviews={book.reviews} />
          <div className="detail-metadata">
            <p>Tác giả: <strong>{book.author}</strong></p>
            <p>Nhà xuất bản: <strong>{book.publisher}</strong></p>
            <p>Năm xuất bản: <strong>{book.year}</strong></p>
            <p>Đã bán: <strong>{book.sold} cuốn</strong></p>
          </div>

          <div className="detail-price">
            <strong>{formatCurrency(book.price)}</strong>
            <del>{formatCurrency(book.oldPrice)}</del>
            <span>-{book.discount}%</span>
          </div>

          <div className="promotion-box">
            <strong>Ưu đãi đang áp dụng</strong>
            <p>Giảm 30.000đ với mã BOOK30 cho đơn từ 300.000đ.</p>
            <p>Miễn phí giao hàng cho đơn hàng đủ điều kiện.</p>
          </div>

          <div className="quantity-row">
            <span>Số lượng:</span>
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
            <strong>{quantity}</strong>
            <button type="button" onClick={() => setQuantity((value) => Math.min(20, value + 1))}>+</button>
          </div>

          <div className="button-row">
            <button className="btn-primary" type="button" onClick={() => onAddToCart(book.id, quantity)}>
              Thêm {quantity} vào giỏ
            </button>
            <button className="btn-secondary" type="button" onClick={() => onBuyNow(book.id, quantity)}>
              Mua ngay
            </button>
          </div>
        </div>
      </section>

      <section className="service-row">
        <article><strong>Miễn phí vận chuyển</strong><span>Đơn hàng từ 300.000đ</span></article>
        <article><strong>Đổi trả dễ dàng</strong><span>Trong vòng 7 ngày</span></article>
        <article><strong>Thanh toán tiện lợi</strong><span>Nhiều hình thức</span></article>
      </section>

      <section className="product-information">
        <div className="information-tabs">
          <button className={activeTab === 'description' ? 'active' : ''} type="button" onClick={() => setActiveTab('description')}>Mô tả</button>
          <button className={activeTab === 'details' ? 'active' : ''} type="button" onClick={() => setActiveTab('details')}>Thông tin chi tiết</button>
          <button className={activeTab === 'reviews' ? 'active' : ''} type="button" onClick={() => setActiveTab('reviews')}>Đánh giá ({book.reviews})</button>
        </div>
        {activeTab === 'description' && <p>{book.description} Nội dung được trình bày rõ ràng, phù hợp để đọc, học tập và làm quà tặng.</p>}
        {activeTab === 'details' && (
          <div className="info-grid">
            <span>Tác giả</span><strong>{book.author}</strong>
            <span>Thể loại</span><strong>{book.category}</strong>
            <span>Nhà xuất bản</span><strong>{book.publisher}</strong>
            <span>Năm xuất bản</span><strong>{book.year}</strong>
            <span>Hình thức</span><strong>Bìa mềm</strong>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="review-box">
            <strong>{book.rating}/5 sao</strong>
            <p>Độc giả đánh giá cao nội dung, chất lượng in và tốc độ giao hàng.</p>
          </div>
        )}
      </section>

      <section>
        <SectionTitle title="Sách liên quan" />
        <div className="book-grid">
          {relatedBooks.map((item) => (
            <BookCard key={item.id} book={item} onOpenBook={onOpenBook} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookDetailPage;
