import { useState } from 'react';
import BookCover from '../components/BookCover';
import { formatCurrency } from '../utils/formatCurrency';

function CartPage({ cartItems, onUpdateQuantity, onRemove, onContinueShopping, onCheckout }) {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const subtotal = cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
  const discount = couponApplied && subtotal >= 300000 ? 30000 : 0;
  const shipping = subtotal >= 300000 || subtotal === 0 ? 0 : 25000;
  const total = subtotal - discount + shipping;

  function applyCoupon(event) {
    event.preventDefault();
    const valid = coupon.trim().toUpperCase() === 'BOOK30' && subtotal >= 300000;
    setCouponApplied(valid);
    setCouponMessage(valid ? 'Áp dụng mã thành công' : 'Mã BOOK30 chỉ dùng cho đơn từ 300.000đ');
  }

  if (!cartItems.length) {
    return (
      <main className="page-section">
        <div className="empty-state">
          <h1>Giỏ hàng đang trống</h1>
          <p>Bạn chưa thêm cuốn sách nào. Hãy chọn một cuốn sách hay để bắt đầu.</p>
          <button className="btn-primary" type="button" onClick={onContinueShopping}>Tiếp tục mua sách</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <div className="breadcrumb">Trang chủ / Giỏ hàng</div>
      <h1 className="page-title">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

      <section className="cart-layout">
        <div>
          <div className="cart-table">
            <div className="cart-head">
              <span>Sản phẩm</span><span>Đơn giá</span><span>Số lượng</span><span>Thành tiền</span>
            </div>
            {cartItems.map((item) => (
              <article className="cart-row" key={item.bookId}>
                <div className="cart-product">
                  <BookCover book={item.book} size="small" />
                  <div>
                    <strong>{item.book.title}</strong>
                    <span>{item.book.author}</span>
                    <button type="button" onClick={() => onRemove(item.bookId)}>Xóa</button>
                  </div>
                </div>
                <span>{formatCurrency(item.book.price)}</span>
                <div className="quantity-control">
                  <button type="button" onClick={() => onUpdateQuantity(item.bookId, item.quantity - 1)}>-</button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => onUpdateQuantity(item.bookId, item.quantity + 1)}>+</button>
                </div>
                <strong>{formatCurrency(item.book.price * item.quantity)}</strong>
              </article>
            ))}
          </div>
          <button className="text-button" type="button" onClick={onContinueShopping}>&larr; Tiếp tục mua sách</button>
        </div>

        <aside className="summary-box">
          <h2>Tổng đơn hàng</h2>
          <form className="coupon-form" onSubmit={applyCoupon}>
            <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Nhập mã BOOK30" />
            <button type="submit">Áp dụng</button>
          </form>
          {couponMessage && <small className={couponApplied ? 'success-text' : 'error-text'}>{couponMessage}</small>}
          <p><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></p>
          <p><span>Giảm giá</span><strong>-{formatCurrency(discount)}</strong></p>
          <p><span>Phí vận chuyển</span><strong>{formatCurrency(shipping)}</strong></p>
          <p className="summary-total"><span>Tổng cộng</span><strong>{formatCurrency(total)}</strong></p>
          <button className="btn-primary full" type="button" onClick={onCheckout}>Tiến hành thanh toán</button>
          <small>Bạn sẽ kiểm tra lại địa chỉ và hình thức thanh toán ở bước tiếp theo.</small>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
