import React, { useState } from 'react';
import toolData from '../data/toolData.json'
import CategoryList from '../components/category/CategoryList';
import ToolGrid from '../components/tool/ToolGrid';
import categories from '../data/categories.json';
import tools from '../data/tools.json';

// Main ToolPage component
const ToolPage = () => {
  // const [selectedCategory, setSelectedCategory] = useState(Object.keys(toolData)[0]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Create a map of category → tools
  const toolMap = {
    'ALL': tools,
    ...categories.reduce((acc, category) => {
      acc[category] = tools.filter((tool) => tool.category === category);
      return acc;
    }, {})
  };


  return (
    <div className="bg-white dark:bg-black">

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Left: Categories Sidebar */}
        <aside className="md:w-1/4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">CATEGORIES</h2>
          <CategoryList
            categories={['ALL', ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>

        {/* Right: Tool Cards */}
        <section className="md:w-3/4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {selectedCategory}
          </h2>
          <ToolGrid tools={toolMap[selectedCategory] || []} />
        </section>
      </main>
    </div>
  );
};

export default ToolPage;