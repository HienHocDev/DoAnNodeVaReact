import { useEffect, useState } from 'react';

function AccountPage({ user, onLogin, onOrders, onUpdateUser, onLogout }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => setFormData(user || {}), [user]);

  if (!user) {
    return (
      <main className="page-section">
        <div className="empty-state">
          <h1>Bạn chưa đăng nhập</h1>
          <p>Đăng nhập để quản lý thông tin và theo dõi đơn hàng.</p>
          <button className="btn-primary" type="button" onClick={onLogin}>Đăng nhập ngay</button>
        </div>
      </main>
    );
  }

  async function saveProfile(event) {
    event.preventDefault();
    await onUpdateUser(formData);
    setIsEditing(false);
  }

  return (
    <main className="page-section account-layout">
      <aside className="account-menu">
        <div className="account-summary"><span>{user.fullName.charAt(0)}</span><strong>{user.fullName}</strong><small>{user.email}</small></div>
        <button className={activeSection === 'profile' ? 'active' : ''} type="button" onClick={() => setActiveSection('profile')}>Thông tin tài khoản</button>
        <button type="button" onClick={onOrders}>Đơn hàng của tôi</button>
        <button className={activeSection === 'address' ? 'active' : ''} type="button" onClick={() => setActiveSection('address')}>Sổ địa chỉ</button>
        <button className={activeSection === 'password' ? 'active' : ''} type="button" onClick={() => setActiveSection('password')}>Đổi mật khẩu</button>
        <button className="logout-button" type="button" onClick={onLogout}>Đăng xuất</button>
      </aside>

      {activeSection === 'profile' && (
        <form className="form-panel" onSubmit={saveProfile}>
          <div className="panel-heading">
            <div><h1>Tài khoản của tôi</h1><p>Quản lý thông tin cá nhân của bạn.</p></div>
            {!isEditing && <button className="btn-secondary" type="button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>}
          </div>
          <div className="form-grid">
            <label>Họ và tên<input disabled={!isEditing} value={formData.fullName || ''} onChange={(event) => setFormData({ ...formData, fullName: event.target.value })} /></label>
            <label>Email<input disabled={!isEditing} type="email" value={formData.email || ''} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /></label>
            <label>Số điện thoại<input disabled={!isEditing} value={formData.phone || ''} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} /></label>
            <label className="full-field">Địa chỉ<input disabled={!isEditing} value={formData.address || ''} onChange={(event) => setFormData({ ...formData, address: event.target.value })} /></label>
          </div>
          {isEditing && <div className="button-row"><button className="btn-primary" type="submit">Lưu thay đổi</button><button className="text-button" type="button" onClick={() => { setFormData(user); setIsEditing(false); }}>Hủy</button></div>}
        </form>
      )}

      {activeSection === 'address' && (
        <section className="form-panel">
          <h1>Sổ địa chỉ</h1>
          <article className="address-card">
            <div><strong>Địa chỉ mặc định</strong><p>{user.fullName} - {user.phone}</p><p>{user.address || 'Chưa cập nhật địa chỉ'}</p></div>
            <button className="btn-secondary" type="button" onClick={() => { setActiveSection('profile'); setIsEditing(true); }}>Cập nhật</button>
          </article>
        </section>
      )}

      {activeSection === 'password' && (
        <form className="form-panel" onSubmit={(event) => { event.preventDefault(); setPasswordMessage('Đổi mật khẩu thành công.'); event.currentTarget.reset(); }}>
          <h1>Đổi mật khẩu</h1>
          <label>Mật khẩu hiện tại<input type="password" required minLength="6" /></label>
          <label>Mật khẩu mới<input type="password" required minLength="6" /></label>
          <label>Nhập lại mật khẩu mới<input type="password" required minLength="6" /></label>
          {passwordMessage && <div className="success-box">{passwordMessage}</div>}
          <button className="btn-primary" type="submit">Cập nhật mật khẩu</button>
        </form>
      )}
    </main>
  );
}

export default AccountPage;
