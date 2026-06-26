import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const adminMenus = [
  'Tổng quan',
  'Sách',
  'Danh mục',
  'Đơn hàng',
  'Khách hàng',
  'Nhân viên',
  'Khuyến mãi',
  'Bình luận',
  'Giao dịch',
  'Thống kê',
  'Cài đặt'
];

function AdminPage({ books, orders, user, onBackHome }) {
  const [activeMenu, setActiveMenu] = useState('Tổng quan');
  const [notice, setNotice] = useState('');
  const totalRevenue = orders.reduce((total, order) => total + Number(order.total || 0), 0);

  function showDeveloping() {
    setNotice('Chức năng này đang phát triển');
    window.setTimeout(() => setNotice(''), 2200);
  }

  if (user?.role !== 'admin') {
    return (
      <main className="page-section">
        <div className="empty-state">
          <h1>Không có quyền truy cập</h1>
          <p>Trang quản trị chỉ dành cho tài khoản admin.</p>
          <button className="btn-primary" type="button" onClick={onBackHome}>Về trang chủ</button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      {notice && <div className="toast-message">{notice}</div>}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>BN</span>
          <div>
            <strong>BookNest</strong>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav>
          {adminMenus.map((menu) => (
            <button
              className={activeMenu === menu ? 'active' : ''}
              key={menu}
              type="button"
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </button>
          ))}
        </nav>
        <div className="admin-profile">
          <span>{user.fullName.charAt(0)}</span>
          <div>
            <strong>{user.fullName}</strong>
            <small>{user.email}</small>
          </div>
        </div>
      </aside>

      <section className="admin-content">
        <div className="admin-topbar">
          <div>
            <small>Quản trị hệ thống</small>
            <h1>{activeMenu}</h1>
          </div>
          <button className="btn-secondary" type="button" onClick={showDeveloping}>
            + Thêm mới
          </button>
        </div>

        {activeMenu === 'Tổng quan' ? (
          <>
            <div className="admin-stat-grid">
              <article><span>Doanh thu</span><strong>{formatCurrency(totalRevenue)}</strong><small>Đang lấy từ đơn hàng</small></article>
              <article><span>Đơn hàng</span><strong>{orders.length}</strong><small>Đơn đã đặt</small></article>
              <article><span>Sách</span><strong>{books.length}</strong><small>Đầu sách hiện có</small></article>
              <article><span>Trạng thái</span><strong>Demo</strong><small>Các chức năng đang phát triển</small></article>
            </div>

            <div className="admin-grid">
              <section className="admin-panel">
                <div className="panel-heading"><h2>Đơn hàng mới nhất</h2><button type="button" onClick={showDeveloping}>Xem tất cả</button></div>
                <table className="admin-table">
                  <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}><td>{order.id}</td><td>{order.customer.fullName}</td><td>{formatCurrency(order.total)}</td><td><mark>{order.status}</mark></td></tr>
                    ))}
                    {!orders.length && <tr><td colSpan="4">Chưa có đơn hàng</td></tr>}
                  </tbody>
                </table>
              </section>

              <section className="admin-panel">
                <div className="panel-heading"><h2>Sách bán chạy</h2><button type="button" onClick={showDeveloping}>Chi tiết</button></div>
                <div className="admin-book-list">
                  {[...books].sort((a, b) => b.sold - a.sold).slice(0, 5).map((book) => (
                    <button key={book.id} type="button" onClick={showDeveloping}>
                      <span>{book.title}</span>
                      <strong>{book.sold || 0} đã bán</strong>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </>
        ) : (
          <section className="admin-panel">
            <div className="admin-module-header">
              <div>
                <h2>Quản lý {activeMenu.toLowerCase()}</h2>
                <p>Khung giao diện đã chuẩn bị sẵn để thành viên phụ trách phát triển tiếp.</p>
              </div>
              <button className="btn-primary" type="button" onClick={showDeveloping}>Thao tác mẫu</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr><th>Tên</th><th>Thông tin</th><th>Trạng thái</th><th>Thao tác</th></tr>
              </thead>
              <tbody>
                <tr><td>Dữ liệu mẫu</td><td>Chờ kết nối API riêng</td><td><mark>Đang phát triển</mark></td><td><button type="button" onClick={showDeveloping}>Sửa</button></td></tr>
                <tr><td>Dữ liệu mẫu</td><td>Phân quyền admin đã có</td><td><mark>Đang phát triển</mark></td><td><button type="button" onClick={showDeveloping}>Xóa</button></td></tr>
              </tbody>
            </table>
          </section>
        )}
      </section>
    </main>
  );
}

export default AdminPage;
