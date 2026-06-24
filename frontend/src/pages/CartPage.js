import BookCover from '../components/BookCover';
import { formatCurrency } from '../utils/formatCurrency';

function CartPage({ cartItems, onUpdateQuantity, onCheckout }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );
  const discount = 30000;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <main className="page-section">
      <div className="breadcrumb">Trang chu / Gio hang</div>
      <h1 className="page-title">Gio hang</h1>

      <section className="cart-layout">
        <div className="cart-table">
          <div className="cart-head">
            <span>San pham</span>
            <span>Don gia</span>
            <span>So luong</span>
            <span>Thanh tien</span>
          </div>

          {cartItems.map((item) => (
            <article className="cart-row" key={item.bookId}>
              <div className="cart-product">
                <BookCover book={item.book} size="small" />
                <strong>{item.book.title}</strong>
              </div>
              <span>{formatCurrency(item.book.price)}</span>
              <div className="quantity-control">
                <button type="button" onClick={() => onUpdateQuantity(item.bookId, item.quantity - 1)}>-</button>
                <strong>{item.quantity}</strong>
                <button type="button" onClick={() => onUpdateQuantity(item.bookId, item.quantity + 1)}>+</button>
              </div>
              <span>{formatCurrency(item.book.price * item.quantity)}</span>
            </article>
          ))}
        </div>

        <aside className="summary-box">
          <h2>Tam tinh</h2>
          <p><span>Tam tinh</span><strong>{formatCurrency(subtotal)}</strong></p>
          <p><span>Giam gia</span><strong>-{formatCurrency(discount)}</strong></p>
          <p><span>Phi van chuyen</span><strong>{formatCurrency(shipping)}</strong></p>
          <p className="summary-total"><span>Tong cong</span><strong>{formatCurrency(total)}</strong></p>
          <button className="btn-primary full" type="button" onClick={onCheckout}>Thanh toan</button>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
