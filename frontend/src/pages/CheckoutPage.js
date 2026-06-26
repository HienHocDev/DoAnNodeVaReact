import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

function CheckoutPage({ cartItems, user, onBackToCart, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    note: '',
    paymentMethod: 'Thanh toán khi nhận hàng'
  });
  const [error, setError] = useState('');
  const subtotal = cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
  const discount = subtotal >= 300000 ? 30000 : 0;
  const shipping = subtotal >= 300000 ? 0 : 25000;
  const total = subtotal - discount + shipping;

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function submitOrder(event) {
    event.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address) {
      setError('Vui lòng nhập đầy đủ thông tin nhận hàng.');
      return;
    }
    if (!/^[0-9+\s]{9,15}$/.test(formData.phone)) {
      setError('Số điện thoại chưa đúng định dạng.');
      return;
    }
    setError('');
    onPlaceOrder({ customer: formData, subtotal, discount, shipping, total });
  }

  if (!cartItems.length) {
    return (
      <main className="page-section">
        <div className="empty-state">
          <h1>Chưa có sản phẩm để thanh toán</h1>
          <button className="btn-primary" type="button" onClick={onBackToCart}>Quay lại giỏ hàng</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="breadcrumb">Trang chủ / Giỏ hàng / Thanh toán</div>
      <h1 className="page-title">Thanh toán</h1>

      <form className="checkout-layout" onSubmit={submitOrder}>
        <section className="form-panel">
          <h2>Thông tin nhận hàng</h2>
          <div className="form-grid">
            <label>Họ và tên<input name="fullName" value={formData.fullName} onChange={updateField} /></label>
            <label>Số điện thoại<input name="phone" value={formData.phone} onChange={updateField} /></label>
            <label>Email<input name="email" type="email" value={formData.email} onChange={updateField} /></label>
            <label className="full-field">Địa chỉ nhận hàng<input name="address" value={formData.address} onChange={updateField} /></label>
            <label className="full-field">Ghi chú<textarea name="note" value={formData.note} onChange={updateField} placeholder="Thời gian giao hàng, chỉ dẫn địa chỉ..." /></label>
          </div>

          <h2>Phương thức thanh toán</h2>
          <div className="payment-options">
            {['Thanh toán khi nhận hàng', 'Chuyển khoản ngân hàng', 'Ví điện tử MoMo'].map((method) => (
              <label className={formData.paymentMethod === method ? 'selected' : ''} key={method}>
                <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={updateField} />
                <span><strong>{method}</strong><small>{method === 'Thanh toán khi nhận hàng' ? 'Thanh toán cho nhân viên giao hàng' : 'Thông tin thanh toán hiện sau khi đặt hàng'}</small></span>
              </label>
            ))}
          </div>
        </section>

        <aside className="summary-box">
          <h2>Đơn hàng của bạn</h2>
          {cartItems.map((item) => (
            <p key={item.bookId}><span>{item.book.title} x{item.quantity}</span><strong>{formatCurrency(item.book.price * item.quantity)}</strong></p>
          ))}
          <p><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></p>
          <p><span>Giảm giá</span><strong>-{formatCurrency(discount)}</strong></p>
          <p><span>Phí vận chuyển</span><strong>{formatCurrency(shipping)}</strong></p>
          <p className="summary-total"><span>Tổng cộng</span><strong>{formatCurrency(total)}</strong></p>
          {error && <div className="form-error">{error}</div>}
          <button className="btn-primary full" type="submit">Đặt hàng</button>
          <button className="text-button full" type="button" onClick={onBackToCart}>Quay lại giỏ hàng</button>
        </aside>
      </form>
    </main>
  );
}

export default CheckoutPage;
