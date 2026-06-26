import { useState } from 'react';
import Logo from '../components/Logo';
import { categories } from '../data/books';

const categoryGroups = [
  {
    title: 'Sách nổi bật',
    links: ['Sách bán chạy', 'Sách mới nhất', 'Sách đang giảm giá']
  },
  {
    title: 'Theo nhu cầu',
    links: ['Phát triển bản thân', 'Học tập và giáo trình', 'Giải trí và thư giãn']
  }
];

function MainLayout({ children, cartCount, user, onNavigate, onSearch, onOpenCategory, onLogout }) {
  const [keyword, setKeyword] = useState('');
  const [booksMenuOpen, setBooksMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  function submitSearch(event) {
    event.preventDefault();
    onSearch(keyword);
  }

  function chooseCategory(categoryName) {
    onOpenCategory(categoryName);
    setBooksMenuOpen(false);
  }

  function handleAccountClick() {
    if (!user) {
      onNavigate('auth');
      return;
    }
    setAccountMenuOpen((isOpen) => !isOpen);
  }

  function handleLogout() {
    setAccountMenuOpen(false);
    onLogout();
  }

  return (
    <div className="app">
      <div className="top-strip">
        <span>Miễn phí vận chuyển cho đơn hàng từ 300.000đ</span>
        <span>Hotline: 0123 456 789</span>
      </div>

      <header className="site-header">
        <div className="header-main header-main--single-row">
          <Logo onClick={() => onNavigate('home')} />

          <form className="search-box" onSubmit={submitSearch}>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm kiếm sách, tác giả, thể loại..."
              aria-label="Từ khóa tìm kiếm"
            />
            <button className="search-icon-button" type="submit" aria-label="Tìm kiếm" title="Tìm kiếm">
              &#128269;
            </button>
          </form>

          <div className="header-icon-actions">
            <div
              className={`header-menu-wrapper books-menu-wrapper ${booksMenuOpen ? 'menu-open' : ''}`}
              onMouseEnter={() => setBooksMenuOpen(true)}
              onMouseLeave={() => setBooksMenuOpen(false)}
            >
              <button
                className={`header-icon-button ${booksMenuOpen ? 'active' : ''}`}
                type="button"
                aria-label="Danh mục sách"
                title="Danh mục sách"
                onClick={() => setBooksMenuOpen((isOpen) => !isOpen)}
              >
                <span className="header-icon" aria-hidden="true">&#128214;</span>
              </button>

              <section className="books-mega-menu">
                <div className="mega-menu-sidebar">
                  <h2>Danh mục sách</h2>
                  <button type="button" onClick={() => chooseCategory('Tất cả')}>
                    Tất cả sách
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => chooseCategory(category.name)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mega-menu-content">
                  <div className="mega-menu-heading">
                    <span aria-hidden="true">&#128214;</span>
                    <h2>Khám phá sách</h2>
                  </div>
                  <div className="mega-menu-columns">
                    {categoryGroups.map((group) => (
                      <div key={group.title}>
                        <h3>{group.title}</h3>
                        {group.links.map((link) => (
                          <button key={link} type="button" onClick={() => chooseCategory('Tất cả')}>
                            {link}
                          </button>
                        ))}
                      </div>
                    ))}
                    <div>
                      <h3>Thể loại</h3>
                      {categories.slice(0, 4).map((category) => (
                        <button key={category.id} type="button" onClick={() => chooseCategory(category.name)}>
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div
              className={`header-menu-wrapper account-menu-wrapper ${accountMenuOpen ? 'menu-open' : ''}`}
              onMouseEnter={() => user && setAccountMenuOpen(true)}
              onMouseLeave={() => setAccountMenuOpen(false)}
            >
              <button
                className={`header-icon-button ${accountMenuOpen ? 'active' : ''}`}
                type="button"
                aria-label={user ? 'Mở menu tài khoản' : 'Đăng nhập hoặc đăng ký'}
                title={user ? 'Tài khoản của tôi' : 'Đăng nhập / Đăng ký'}
                onClick={handleAccountClick}
              >
                <span className="header-icon user-icon" aria-hidden="true">&#128100;</span>
              </button>

              {user && (
                <div className="account-dropdown">
                  <div className="account-dropdown__user">
                    <span>{user.fullName.charAt(0)}</span>
                    <div>
                      <strong>{user.fullName}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>
                  {isAdmin && (
                    <button type="button" onClick={() => { onNavigate('admin'); setAccountMenuOpen(false); }}>
                      Trang quản trị
                    </button>
                  )}
                  <button type="button" onClick={() => { onNavigate('account'); setAccountMenuOpen(false); }}>
                    Thông tin tài khoản
                  </button>
                  <button type="button" onClick={() => { onNavigate('orders'); setAccountMenuOpen(false); }}>
                    Đơn hàng của tôi
                  </button>
                  <button className="account-dropdown__logout" type="button" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            <button
              className="header-icon-button cart-icon-button"
              type="button"
              aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}
              title="Giỏ hàng"
              onClick={() => onNavigate('cart')}
            >
              <span className="header-icon" aria-hidden="true">&#128722;</span>
              <span className="header-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {children}
      <footer className="site-footer">
        <div>
          <Logo onClick={() => onNavigate('home')} />
          <p>Nhà sách trực tuyến dành cho người yêu tri thức.</p>
        </div>
        <div>
          <strong>Hỗ trợ khách hàng</strong>
          <span>Hotline: 0123 456 789</span>
          <span>Email: support@booknest.vn</span>
        </div>
        <div>
          <strong>Thông tin</strong>
          <button type="button" onClick={() => onNavigate('books')}>Tất cả sách</button>
          <button type="button" onClick={() => onNavigate('orders')}>Kiểm tra đơn hàng</button>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
