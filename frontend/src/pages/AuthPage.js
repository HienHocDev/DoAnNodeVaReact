function AuthPage() {
  return (
    <main className="page-section auth-page">
      <section className="auth-panel">
        <h1>Dang nhap</h1>
        <p>Chao mung ban quay tro lai</p>
        <input placeholder="Email" defaultValue="example@gmail.com" />
        <input type="password" placeholder="Mat khau" defaultValue="12345678" />
        <div className="form-options">
          <label><input type="checkbox" /> Ghi nho dang nhap</label>
          <button type="button">Quen mat khau</button>
        </div>
        <button className="btn-primary full" type="button">Dang nhap</button>
      </section>

      <section className="auth-panel">
        <h1>Dang ky</h1>
        <p>Tao tai khoan moi</p>
        <input placeholder="Ho va ten" defaultValue="Nguyen Van A" />
        <input placeholder="Email" defaultValue="example@gmail.com" />
        <input placeholder="So dien thoai" defaultValue="0123 456 789" />
        <input type="password" placeholder="Mat khau" defaultValue="12345678" />
        <input type="password" placeholder="Nhap lai mat khau" defaultValue="12345678" />
        <label><input type="checkbox" /> Toi dong y voi dieu khoan su dung</label>
        <button className="btn-primary full" type="button">Dang ky</button>
      </section>
    </main>
  );
}

export default AuthPage;
