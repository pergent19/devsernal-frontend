import { ChevronDown } from 'lucide-react';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full">
      {/* Mobile: Select Dropdown */}
      <div className="block md:hidden relative">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4ed8d5] focus:border-transparent appearance-none cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.toLowerCase()}
            </option>
          ))}
        </select>
        
        {/* Custom Arrow Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>


      {/* Desktop: Button List */}
      <div className="hidden md:block space-y-2">
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
    </div>
  );
};

export default CategoryList;