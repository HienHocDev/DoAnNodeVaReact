import { useState } from 'react';
import BookCover from '../components/BookCover';
import { formatCurrency } from '../utils/formatCurrency';

function OrdersPage({ orders, onShop }) {
  const [activeStatus, setActiveStatus] = useState('Tất cả');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const statuses = ['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'];
  const filteredOrders = activeStatus === 'Tất cả' ? orders : orders.filter((order) => order.status === activeStatus);
  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  if (!orders.length) {
    return (
      <main className="page-section">
        <div className="empty-state">
          <h1>Bạn chưa có đơn hàng</h1>
          <p>Các đơn hàng sau khi đặt sẽ được hiển thị tại đây.</p>
          <button className="btn-primary" type="button" onClick={onShop}>Khám phá sách</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-section">
      <h1 className="page-title">Đơn hàng của tôi</h1>
      <section className="orders-panel">
        <div className="order-tabs">
          {statuses.map((status) => (
            <button className={activeStatus === status ? 'active' : ''} key={status} type="button" onClick={() => setActiveStatus(status)}>{status}</button>
          ))}
        </div>

        {filteredOrders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card__header">
              <div><strong>#{order.id}</strong><span>Đặt ngày {order.createdAt}</span></div>
              <mark>{order.status}</mark>
            </div>
            <div className="order-products">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.bookId}><BookCover book={item.book} size="small" /><span>{item.book.title}<small>Số lượng: {item.quantity}</small></span></div>
              ))}
            </div>
            <div className="order-card__footer">
              <span>Tổng thanh toán: <strong>{formatCurrency(order.total)}</strong></span>
              <button className="btn-secondary" type="button" onClick={() => setSelectedOrderId(order.id)}>Xem chi tiết</button>
            </div>
          </article>
        ))}
      </section>

      {selectedOrder && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedOrderId(null)}>
          <section className="order-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="panel-heading"><div><h2>Chi tiết đơn #{selectedOrder.id}</h2><p>Trạng thái: {selectedOrder.status}</p></div><button className="modal-close" type="button" onClick={() => setSelectedOrderId(null)}>X</button></div>
            <div className="order-customer"><strong>Thông tin nhận hàng</strong><p>{selectedOrder.customer.fullName} - {selectedOrder.customer.phone}</p><p>{selectedOrder.customer.address}</p><p>{selectedOrder.customer.paymentMethod}</p></div>
            {selectedOrder.items.map((item) => (
              <div className="modal-product" key={item.bookId}><BookCover book={item.book} size="small" /><span>{item.book.title} x{item.quantity}</span><strong>{formatCurrency(item.book.price * item.quantity)}</strong></div>
            ))}
            <div className="modal-total"><span>Tổng cộng</span><strong>{formatCurrency(selectedOrder.total)}</strong></div>
          </section>
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
