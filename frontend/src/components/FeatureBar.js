const features = [
  ['VC', 'Mien phi van chuyen', 'Don hang tu 300k'],
  ['DT', 'Doi tra de dang', 'Trong vong 7 ngay'],
  ['TT', 'Thanh toan tien loi', 'Nhieu hinh thuc'],
  ['HT', 'Ho tro 24/7', '0123 456 789']
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
