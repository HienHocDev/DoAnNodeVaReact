import { useEffect, useMemo, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import { books as sampleBooks } from './data/books';
import {
  createOrder,
  getBooks,
  getOrders,
  loginUser,
  registerUser,
  updateUser as updateUserApi
} from './api/bookApi';
import './styles/App.css';

const defaultUser = {
  fullName: '',
  email: '',
  phone: '',
  address: ''
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [books, setBooks] = useState(sampleBooks);
  const [selectedBookId, setSelectedBookId] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cartItems, setCartItems] = useState(() => readStorage('booknest-cart', []));
  const [user, setUser] = useState(() => {
    const savedUser = readStorage('booknest-user', null);
    return savedUser?.id ? savedUser : null;
  });
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getBooks()
      .then((data) => {
        if (data.length) {
          setBooks(data);
          setSelectedBookId(data[0].id);
        }
      })
      .catch(() => setNotification('Chưa tải được sách từ database, đang dùng dữ liệu mẫu'));
  }, []);

  useEffect(() => {
    localStorage.setItem('booknest-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem('booknest-user', JSON.stringify(user));
      getOrders(user.id)
        .then(setOrders)
        .catch(() => setOrders([]));
    } else {
      localStorage.removeItem('booknest-user');
      setOrders([]);
    }
  }, [user]);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = window.setTimeout(() => setNotification(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) || books[0],
    [books, selectedBookId]
  );

  const cartDetails = cartItems
    .map((item) => ({
      ...item,
      book: books.find((book) => book.id === item.bookId)
    }))
    .filter((item) => item.book);

  useEffect(() => {
    if (!books.length || !cartItems.length) return;

    const validBookIds = new Set(books.map((book) => book.id));
    const validCartItems = cartItems.filter((item) => validBookIds.has(item.bookId));

    if (validCartItems.length !== cartItems.length) {
      setCartItems(validCartItems);
    }
  }, [books, cartItems]);

  const cartCount = cartDetails.reduce((total, item) => total + item.quantity, 0);

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openBook(bookId) {
    setSelectedBookId(bookId);
    navigate('detail');
  }

  function handleSearch(keyword) {
    setSearchKeyword(keyword.trim());
    setSelectedCategory('Tất cả');
    navigate('books');
  }

  function openCategory(categoryName) {
    setSelectedCategory(categoryName);
    setSearchKeyword('');
    navigate('books');
  }

  function addToCart(bookId, quantity = 1) {
    setCartItems((items) => {
      const existedItem = items.find((item) => item.bookId === bookId);
      if (existedItem) {
        return items.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: Math.min(item.quantity + quantity, 20) }
            : item
        );
      }
      return [...items, { bookId, quantity }];
    });
    setNotification('Đã thêm sách vào giỏ hàng');
  }

  function updateQuantity(bookId, nextQuantity) {
    if (nextQuantity <= 0) {
      setCartItems((items) => items.filter((item) => item.bookId !== bookId));
      setNotification('Đã xóa sách khỏi giỏ hàng');
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.bookId === bookId ? { ...item, quantity: Math.min(nextQuantity, 20) } : item
      )
    );
  }

  function removeFromCart(bookId) {
    setCartItems((items) => items.filter((item) => item.bookId !== bookId));
    setNotification('Đã xóa sách khỏi giỏ hàng');
  }

  async function placeOrder(orderInformation) {
    if (!user) {
      setNotification('Vui lòng đăng nhập trước khi đặt hàng');
      navigate('auth');
      return;
    }

    try {
      await createOrder({
        userId: user.id,
        items: cartDetails,
        ...orderInformation
      });
      const latestOrders = await getOrders(user.id);
      setOrders(latestOrders);
      setCartItems([]);
      setNotification('Đặt hàng thành công');
      navigate('orders');
    } catch (error) {
      setNotification(error.message);
    }
  }

  async function handleLogin(formData) {
    try {
      const loggedInUser = await loginUser(formData);
      setUser(loggedInUser);
      setNotification('Đăng nhập thành công');
      navigate('account');
    } catch (error) {
      setNotification(error.message);
    }
  }

  async function handleRegister(formData) {
    try {
      const registeredUser = await registerUser(formData);
      setUser(registeredUser);
      setNotification('Tạo tài khoản thành công');
      navigate('account');
    } catch (error) {
      setNotification(error.message);
    }
  }

  async function updateUser(nextUser) {
    try {
      const updatedUser = await updateUserApi(user.id, nextUser);
      setUser(updatedUser);
      setNotification('Đã cập nhật thông tin vào database');
    } catch (error) {
      setNotification(error.message);
    }
  }

  function logout() {
    setUser(null);
    setNotification('Đã đăng xuất');
    navigate('home');
  }

  function renderPage() {
    if (currentPage === 'admin') {
      return (
        <AdminPage
          books={books}
          orders={orders}
          user={user}
          onBackHome={() => navigate('home')}
        />
      );
    }

    if (currentPage === 'books') {
      return (
        <BooksPage
          books={books}
          initialKeyword={searchKeyword}
          initialCategory={selectedCategory}
          onOpenBook={openBook}
          onAddToCart={addToCart}
        />
      );
    }

    if (currentPage === 'detail' && selectedBook) {
      return (
        <BookDetailPage
          book={selectedBook}
          relatedBooks={books.filter((book) => book.id !== selectedBook.id).slice(0, 5)}
          onOpenBook={openBook}
          onAddToCart={addToCart}
          onBuyNow={(bookId, quantity) => {
            addToCart(bookId, quantity);
            navigate('cart');
          }}
        />
      );
    }

    if (currentPage === 'cart') {
      return (
        <CartPage
          cartItems={cartDetails}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onContinueShopping={() => navigate('books')}
          onCheckout={() => navigate('checkout')}
        />
      );
    }

    if (currentPage === 'checkout') {
      return (
        <CheckoutPage
          cartItems={cartDetails}
          user={user || defaultUser}
          onBackToCart={() => navigate('cart')}
          onPlaceOrder={placeOrder}
        />
      );
    }

    if (currentPage === 'auth') {
      return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;
    }

    if (currentPage === 'account') {
      return (
        <AccountPage
          user={user}
          onLogin={() => navigate('auth')}
          onOrders={() => navigate('orders')}
          onUpdateUser={updateUser}
          onLogout={logout}
        />
      );
    }

    if (currentPage === 'orders') {
      return <OrdersPage orders={orders} onShop={() => navigate('books')} />;
    }

    return (
      <HomePage
        books={books}
        onOpenBook={openBook}
        onOpenCategory={openCategory}
        onViewAll={() => navigate('books')}
        onAddToCart={addToCart}
      />
    );
  }

  return (
    <MainLayout
      cartCount={cartCount}
      user={user}
      onNavigate={navigate}
      onSearch={handleSearch}
      onOpenCategory={openCategory}
      onLogout={logout}
    >
      {notification && <div className="toast-message">{notification}</div>}
      {renderPage()}
    </MainLayout>
  );
}

export default App;
