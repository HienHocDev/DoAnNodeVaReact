const iconMap = {
  book: 'B',
  chart: 'K',
  idea: 'Y',
  planet: 'N',
  notebook: 'G',
  friends: 'T'
};

function CategoryCard({ category, onClick }) {
  return (
    <button className="category-card" type="button" onClick={() => onClick(category.name)}>
      <span>{iconMap[category.icon]}</span>
      <p>{category.name}</p>
    </button>
  );
}

export default CategoryCard;
