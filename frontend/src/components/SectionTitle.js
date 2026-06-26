function SectionTitle({ title, actionText = 'Xem tất cả', onAction }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {onAction ? (
        <button type="button" onClick={onAction}>
          {actionText} &rarr;
        </button>
      ) : null}
    </div>
  );
}

export default SectionTitle;
