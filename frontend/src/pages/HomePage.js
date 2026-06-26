import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import FeatureBar from '../components/FeatureBar';
import SectionTitle from '../components/SectionTitle';
import { categories } from '../data/books';

function HomePage({ books, onOpenBook, onOpenCategory, onViewAll, onAddToCart }) {
  const bestSellers = [...books].sort((a, b) => b.sold - a.sold).slice(0, 6);
  const newestBooks = [...books].sort((a, b) => b.year - a.year).slice(0, 6);

  return (
    <main>
      <section className="hero-home">
        <div className="hero-home__content">
          <p>Khám phá thế giới tri thức</p>
          <h1>Sách hay cho cuộc sống tốt đẹp hơn</h1>
          <span>Chọn sách theo chủ đề, xem đánh giá và đặt mua nhanh tại BookNest.</span>
          <div className="button-row">
            <button type="button" onClick={() => onOpenBook(1)}>Mua sách nổi bật</button>
            <button className="hero-outline" type="button" onClick={onViewAll}>Xem tất cả sách</button>
          </div>
        </div>
      </section>

      <FeatureBar />

      <section className="page-section">
        <SectionTitle title="Danh mục nổi bật" onAction={onViewAll} />
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onClick={onOpenCategory} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle title="Sách bán chạy" onAction={onViewAll} />
        <div className="book-grid">
          {bestSellers.map((book) => (
            <BookCard key={book.id} book={book} onOpenBook={onOpenBook} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle title="Sách mới nhất" onAction={onViewAll} />
        <div className="book-grid">
          {newestBooks.map((book) => (
            <BookCard key={book.id} book={book} onOpenBook={onOpenBook} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div>
          <h2>Nhận tin sách mới mỗi tuần</h2>
          <p>Cập nhật đầu sách mới, mã giảm giá và gợi ý đọc sách phù hợp.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email của bạn" required />
          <button className="btn-primary" type="submit">Đăng ký</button>
        </form>
      </section>
    </main>
  );
}

export default HomePage;
