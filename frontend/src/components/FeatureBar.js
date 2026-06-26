const features = [
  ['VC', 'Miễn phí vận chuyển', 'Đơn hàng từ 300.000đ'],
  ['ĐT', 'Đổi trả dễ dàng', 'Trong vòng 7 ngày'],
  ['TT', 'Thanh toán tiện lợi', 'Nhiều hình thức'],
  ['HT', 'Hỗ trợ 24/7', '0123 456 789']
];

function FeatureBar() {
  return (
    <section className="feature-bar">
      {features.map((feature) => (
        <article key={feature[0]}>
          <span>{feature[0]}</span>
          <div>
            <strong>{feature[1]}</strong>
            <p>{feature[2]}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default FeatureBar;
