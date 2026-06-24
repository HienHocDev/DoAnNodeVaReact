import BookCard from '../components/BookCard';
import SectionTitle from '../components/SectionTitle';
import { categories } from '../data/books';

function BooksPage({ books, onOpenBook }) {
  return (
    <main className="catalog-page page-section">
      <div className="breadcrumb">Trang chu / Sach</div>
      <SectionTitle title="Tat ca sach" />

      <div className="catalog-layout">
        <aside className="filter-sidebar">
          <h3>Danh muc</h3>
          {categories.map((category) => (
            <button key={category.id} type="button">
              {category.name}
            </button>
          ))}

          <h3>Khoang gia</h3>
          <div className="price-range">
            <span>0d</span>
            <span>500.000d</span>
          </div>

          <h3>Tac gia</h3>
          {['Nguyen Nhat Anh', 'Paulo Coelho', 'Dale Carnegie', 'James Clear'].map((name) => (
            <label key={name}>
              <input type="checkbox" /> {name}
            </label>
          ))}
        </aside>

        <section>
          <div className="catalog-toolbar">
            <span>Hien thi 1 - {books.length} trong {books.length} san pham</span>
            <select defaultValue="newest">
              <option value="newest">Moi nhat</option>
              <option value="priceAsc">Gia tang dan</option>
              <option value="priceDesc">Gia giam dan</option>
            </select>
          </div>

          <div className="book-grid catalog-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onOpenBook={onOpenBook} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default BooksPage;
