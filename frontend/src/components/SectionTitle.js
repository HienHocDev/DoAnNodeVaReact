function SectionTitle({ title, actionText = 'Xem tat ca', onAction }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {onAction ? (
        <button type="button" onClick={onAction}>
          {actionText} →
        </button>
      ) : null}
    </div>
  );
}

export default SectionTitle;
