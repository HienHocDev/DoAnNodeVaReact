function Logo({ onClick }) {
  return (
    <button className="logo" type="button" aria-label="Về trang chủ BookNest" onClick={onClick}>
      <span className="logo-mark">BN</span>
      <strong>BookNest</strong>
    </button>
  );
}

export default Logo;
