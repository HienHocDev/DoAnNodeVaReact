import { useState } from 'react';

function AuthPage({ onLogin, onRegister }) {
  const [activeMode, setActiveMode] = useState('login');
  const [message, setMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', accepted: false
  });

  function submitLogin(event) {
    event.preventDefault();
    if (!loginData.email || loginData.password.length < 6) {
      setMessage('Email hợp lệ và mật khẩu từ 6 ký tự là bắt buộc.');
      return;
    }
    onLogin(loginData);
  }

  function submitRegister(event) {
    event.preventDefault();
    if (!registerData.fullName || !registerData.email || !registerData.phone) {
      setMessage('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (registerData.password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setMessage('Mật khẩu nhập lại không khớp.');
      return;
    }
    if (!registerData.accepted) {
      setMessage('Bạn cần đồng ý với điều khoản sử dụng.');
      return;
    }
    onRegister(registerData);
  }

  return (
    <main className="page-section auth-wrapper">
      <section className="auth-intro">
        <span>BookNest Membership</span>
        <h1>Một tài khoản, nhiều tiện ích đọc sách</h1>
        <p>Theo dõi đơn hàng, lưu thông tin giao hàng và nhận ưu đãi thành viên.</p>
        <ul>
          <li>Quản lý đơn hàng tập trung</li>
          <li>Thanh toán nhanh hơn</li>
          <li>Nhận gợi ý sách phù hợp</li>
        </ul>
      </section>

      <section className="auth-panel">
        <div className="auth-tabs">
          <button className={activeMode === 'login' ? 'active' : ''} type="button" onClick={() => { setActiveMode('login'); setMessage(''); }}>Đăng nhập</button>
          <button className={activeMode === 'register' ? 'active' : ''} type="button" onClick={() => { setActiveMode('register'); setMessage(''); }}>Đăng ký</button>
        </div>

        {activeMode === 'login' ? (
          <form onSubmit={submitLogin}>
            <h2>Chào mừng bạn quay trở lại</h2>
            <label>Email<input type="email" value={loginData.email} onChange={(event) => setLoginData({ ...loginData, email: event.target.value })} placeholder="example@gmail.com" /></label>
            <label>Mật khẩu<input type="password" value={loginData.password} onChange={(event) => setLoginData({ ...loginData, password: event.target.value })} placeholder="Ít nhất 6 ký tự" /></label>
            <div className="form-options">
              <label className="inline-checkbox"><input type="checkbox" /> Ghi nhớ đăng nhập</label>
              <button type="button" onClick={() => setMessage('Tính năng khôi phục mật khẩu sẽ gửi liên kết qua email.')}>Quên mật khẩu?</button>
            </div>
            {message && <div className="form-error">{message}</div>}
            <button className="btn-primary full" type="submit">Đăng nhập</button>
          </form>
        ) : (
          <form onSubmit={submitRegister}>
            <h2>Tạo tài khoản mới</h2>
            <label>Họ và tên<input value={registerData.fullName} onChange={(event) => setRegisterData({ ...registerData, fullName: event.target.value })} /></label>
            <label>Email<input type="email" value={registerData.email} onChange={(event) => setRegisterData({ ...registerData, email: event.target.value })} /></label>
            <label>Số điện thoại<input value={registerData.phone} onChange={(event) => setRegisterData({ ...registerData, phone: event.target.value })} /></label>
            <label>Mật khẩu<input type="password" value={registerData.password} onChange={(event) => setRegisterData({ ...registerData, password: event.target.value })} /></label>
            <label>Nhập lại mật khẩu<input type="password" value={registerData.confirmPassword} onChange={(event) => setRegisterData({ ...registerData, confirmPassword: event.target.value })} /></label>
            <label className="checkbox-label"><input type="checkbox" checked={registerData.accepted} onChange={(event) => setRegisterData({ ...registerData, accepted: event.target.checked })} /> Tôi đồng ý với điều khoản sử dụng</label>
            {message && <div className="form-error">{message}</div>}
            <button className="btn-primary full" type="submit">Đăng ký</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default AuthPage;
