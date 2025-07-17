// Reusable CategoryList component
const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full space-y-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            selectedCategory === category
              ? 'bg-[#4ed8d5] text-white'
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          {category.toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;