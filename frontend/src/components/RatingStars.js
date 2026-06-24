function RatingStars({ rating, reviews }) {
  return (
    <div className="rating" aria-label={`${rating} sao`}>
      <span>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
      <small>({reviews})</small>
    </div>
  );
}

export default RatingStars;
