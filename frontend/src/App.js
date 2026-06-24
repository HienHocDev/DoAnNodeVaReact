import { useMemo, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import { books } from './data/books';
import './styles/App.css';

const defaultCart = [
  { bookId: 1, quantity: 1 },
  { bookId: 2, quantity: 2 },
  { bookId: 3, quantity: 1 }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBookId, setSelectedBookId] = useState(1);
  const [cartItems, setCartItems] = useState(defaultCart);

  const featuredBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) || books[0],
    [selectedBookId]
  );

  const cartDetails = cartItems.map((item) => {
    const book = books.find((bookItem) => bookItem.id === item.bookId);
    return { ...item, book };
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function openBook(bookId) {
    setSelectedBookId(bookId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(bookId) {
    setCartItems((items) => {
      const existedItem = items.find((item) => item.bookId === bookId);

      if (existedItem) {
        return items.map((item) =>
          item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...items, { bookId, quantity: 1 }];
    });
  }

  function updateQuantity(bookId, nextQuantity) {
    if (nextQuantity <= 0) {
      setCartItems((items) => items.filter((item) => item.bookId !== bookId));
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.bookId === bookId ? { ...item, quantity: nextQuantity } : item
      )
    );
  }

  function renderPage() {
    if (currentPage === 'books') {
      return <BooksPage books={books} onOpenBook={openBook} />;
    }

    if (currentPage === 'detail') {
      return (
        <BookDetailPage
          book={featuredBook}
          relatedBooks={books.filter((book) => book.id !== featuredBook.id).slice(0, 5)}
          onOpenBook={openBook}
          onAddToCart={addToCart}
          onBuyNow={(bookId) => {
            addToCart(bookId);
            setCurrentPage('cart');
          }}
        />
      );
    }

    if (currentPage === 'cart') {
      return (
        <CartPage
          cartItems={cartDetails}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => setCurrentPage('checkout')}
        />
      );
    }

    if (currentPage === 'checkout') {
      return <CheckoutPage cartItems={cartDetails} />;
    }

    if (currentPage === 'auth') {
      return <AuthPage />;
    }

    if (currentPage === 'account') {
      return <AccountPage />;
    }

    if (currentPage === 'orders') {
      return <OrdersPage />;
    }

    return <HomePage books={books} onOpenBook={openBook} />;
  }

  return (
    <MainLayout
      currentPage={currentPage}
      cartCount={cartCount}
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </MainLayout>
  );
}

export default App;
