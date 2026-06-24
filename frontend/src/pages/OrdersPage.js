const orders = [
  ['#BN123456', '20/05/2024', '350.000d', 'Cho xac nhan'],
  ['#BN123455', '20/05/2024', '750.000d', 'Da giao'],
  ['#BN123454', '15/05/2024', '420.000d', 'Da huy']
];

function OrdersPage() {
  return (
    <main className="page-section">
      <h1 className="page-title">Don hang cua toi</h1>
      <section className="orders-panel">
        <div className="order-tabs">
          <button className="active" type="button">Tat ca</button>
          <button type="button">Cho xac nhan</button>
          <button type="button">Dang giao</button>
          <button type="button">Da giao</button>
          <button type="button">Da huy</button>
        </div>

        {orders.map((order) => (
          <article className="order-row" key={order[0]}>
            <strong>{order[0]}</strong>
            <span>Ngay dat: {order[1]}</span>
            <span>Tong tien: {order[2]}</span>
            <mark>{order[3]}</mark>
          </article>
        ))}
      </section>
    </main>
  );
}

export default OrdersPage;
