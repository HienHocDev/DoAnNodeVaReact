import Logo from '../components/Logo';

const menuItems = [
  ['home', 'Trang chu'],
  ['books', 'Sach'],
  ['books', 'Danh muc'],
  ['books', 'Khuyen mai'],
  ['orders', 'Don hang'],
  ['account', 'Tai khoan']
];

function MainLayout({ children, currentPage, cartCount, onNavigate }) {
  return (
    <div className="app">
      <div className="top-strip">
        <span>Freeship cho don hang tu 300k</span>
        <span>Hotline: 0123 456 789</span>
      </div>

      <header className="site-header">
        <div className="header-main">
          <Logo />
          <div className="search-box">
            <input placeholder="Tim kiem sach, tac gia, the loai..." />
            <button type="button">Tim</button>
          </div>
          <div className="header-actions">
            <button type="button" onClick={() => onNavigate('account')}>Tai khoan</button>
            <button type="button" onClick={() => onNavigate('cart')}>
              Gio hang <span>{cartCount}</span>
            </button>
          </div>
        </div>

        <nav className="main-nav">
          {menuItems.map((item, index) => (
            <button
              key={`${item[1]}-${index}`}
              className={currentPage === item[0] ? 'active' : ''}
              type="button"
              onClick={() => onNavigate(item[0])}
            >
              {item[1]}
            </button>
          ))}
          <button type="button" onClick={() => onNavigate('auth')}>
            Dang nhap / Dang ky
          </button>
        </nav>
      </header>

      {children}
    </div>
  );
}

export default MainLayout;
