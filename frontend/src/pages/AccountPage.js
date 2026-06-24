function AccountPage() {
  return (
    <main className="page-section account-layout">
      <aside className="account-menu">
        <button className="active" type="button">Thong tin tai khoan</button>
        <button type="button">Don hang cua toi</button>
        <button type="button">So dia chi</button>
        <button type="button">Doi mat khau</button>
        <button type="button">Dang xuat</button>
      </aside>

      <section className="form-panel">
        <h1>Tai khoan cua toi</h1>
        <h2>Thong tin tai khoan</h2>
        <div className="info-grid">
          <span>Ho va ten</span><strong>Nguyen Van A</strong>
          <span>Email</span><strong>example@gmail.com</strong>
          <span>So dien thoai</span><strong>0123 456 789</strong>
          <span>Dia chi</span><strong>56 T23, Duong ABC, Quan 1, TP.HCM</strong>
        </div>
        <button className="btn-secondary" type="button">Cap nhat thong tin</button>
      </section>
    </main>
  );
}

export default AccountPage;
