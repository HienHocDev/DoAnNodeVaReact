import { formatCurrency } from '../utils/formatCurrency';

function CheckoutPage({ cartItems }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
  const total = subtotal - 30000;

  return (
    <main className="page-section">
      <div className="breadcrumb">Trang chu / Thanh toan</div>
      <h1 className="page-title">Thanh toan</h1>

      <section className="checkout-layout">
        <form className="form-panel">
          <h2>Thong tin nhan hang</h2>
          <input placeholder="Ho va ten" defaultValue="Nguyen Van A" />
          <input placeholder="So dien thoai" defaultValue="0123 456 789" />
          <input placeholder="Email" defaultValue="example@gmail.com" />
          <input placeholder="Dia chi" defaultValue="56 T23, Duong ABC, Quan 1, TP.HCM" />
          <textarea placeholder="Ghi chu don hang" />

          <h2>Phuong thuc thanh toan</h2>
          <div className="payment-row">
            <label><input type="radio" name="payment" defaultChecked /> Thanh toan khi nhan hang</label>
            <label><input type="radio" name="payment" /> Chuyen khoan ngan hang</label>
            <label><input type="radio" name="payment" /> Vi dien tu MoMo</label>
          </div>
        </form>

        <aside className="summary-box">
          <h2>Don hang cua ban</h2>
          {cartItems.map((item) => (
            <p key={item.bookId}>
              <span>{item.book.title} x{item.quantity}</span>
              <strong>{formatCurrency(item.book.price * item.quantity)}</strong>
            </p>
          ))}
          <p><span>Tam tinh</span><strong>{formatCurrency(subtotal)}</strong></p>
          <p><span>Giam gia</span><strong>-30.000d</strong></p>
          <p><span>Phi van chuyen</span><strong>0d</strong></p>
          <p className="summary-total"><span>Tong cong</span><strong>{formatCurrency(total)}</strong></p>
          <button className="btn-primary full" type="button">Dat hang</button>
        </aside>
      </section>
    </main>
  );
}

export default CheckoutPage;
