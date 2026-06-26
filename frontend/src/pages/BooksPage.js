import { useEffect, useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import SectionTitle from '../components/SectionTitle';
import { categories } from '../data/books';

function BooksPage({ books, initialKeyword, initialCategory, onOpenBook, onAddToCart }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minimumRating, setMinimumRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => setKeyword(initialKeyword), [initialKeyword]);
  useEffect(() => setCategory(initialCategory), [initialCategory]);

  const filteredBooks = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const result = books.filter((book) => {
      const matchesKeyword =
        !normalizedKeyword ||
        [book.title, book.author, book.category].some((value) =>
          value.toLowerCase().includes(normalizedKeyword)
        );
      const matchesCategory = category === 'Tất cả' || book.category === category;
      return matchesKeyword && matchesCategory && book.price <= maxPrice && book.rating >= minimumRating;
    });

    return [...result].sort((firstBook, secondBook) => {
      if (sortBy === 'priceAsc') return firstBook.price - secondBook.price;
      if (sortBy === 'priceDesc') return secondBook.price - firstBook.price;
      if (sortBy === 'popular') return secondBook.sold - firstBook.sold;
      return secondBook.year - firstBook.year;
    });
  }, [books, category, keyword, maxPrice, minimumRating, sortBy]);

  function resetFilters() {
    setKeyword('');
    setCategory('Tất cả');
    setMaxPrice(200000);
    setMinimumRating(0);
    setSortBy('newest');
  }

  return (
    <main className="catalog-page page-section">
      <div className="breadcrumb">Trang chủ / Sách</div>
      <SectionTitle title="Tất cả sách" />

      <div className="catalog-layout">
        <aside className="filter-sidebar">
          <div className="filter-heading">
            <h3>Bộ lọc</h3>
            <button type="button" onClick={resetFilters}>Xóa lọc</button>
          </div>
          <label className="filter-search">
            <span>Từ khóa</span>
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tên sách hoặc tác giả" />
          </label>

          <h3>Danh mục</h3>
          <button className={category === 'Tất cả' ? 'selected' : ''} type="button" onClick={() => setCategory('Tất cả')}>Tất cả</button>
          {categories.map((item) => (
            <button className={category === item.name ? 'selected' : ''} key={item.id} type="button" onClick={() => setCategory(item.name)}>
              {item.name}
            </button>
          ))}

          <h3>Khoảng giá: {maxPrice.toLocaleString('vi-VN')}đ</h3>
          <input className="range-input" type="range" min="50000" max="200000" step="10000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />

          <h3>Đánh giá</h3>
          {[5, 4, 3, 0].map((rating) => (
            <label className="radio-filter" key={rating}>
              <input type="radio" name="rating" checked={minimumRating === rating} onChange={() => setMinimumRating(rating)} />
              {rating === 0 ? 'Tất cả đánh giá' : `Từ ${rating} sao`}
            </label>
          ))}
        </aside>

        <section>
          <div className="catalog-toolbar">
            <span>Tìm thấy {filteredBooks.length} sản phẩm</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Mới nhất</option>
              <option value="popular">Bán chạy</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
            </select>
          </div>

          {filteredBooks.length ? (
            <div className="book-grid catalog-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onOpenBook={onOpenBook} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Không tìm thấy sách phù hợp</h2>
              <p>Thử thay đổi từ khóa, danh mục hoặc khoảng giá.</p>
              <button className="btn-secondary" type="button" onClick={resetFilters}>Xóa bộ lọc</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BooksPage;
