import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import FeatureBar from '../components/FeatureBar';
import SectionTitle from '../components/SectionTitle';
import { categories } from '../data/books';

function HomePage({ books, onOpenBook }) {
  return (
    <main>
      <section className="hero-home">
        <div className="hero-home__content">
          <p>Kham pha the gioi tri thuc</p>
          <h1>Sach hay cho cuoc song tot dep hon</h1>
          <span>Hang ngan dau sach hap dan dang cho ban kham pha</span>
          <button type="button" onClick={() => onOpenBook(1)}>
            Mua ngay
          </button>
        </div>
      </section>

      <FeatureBar />

      <section className="page-section">
        <SectionTitle title="Danh muc noi bat" />
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle title="Sach ban chay" />
        <div className="book-grid">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} onOpenBook={onOpenBook} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionTitle title="Sach moi nhat" />
        <div className="book-grid">
          {books.slice(2, 8).map((book) => (
            <BookCard key={book.id} book={book} onOpenBook={onOpenBook} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
