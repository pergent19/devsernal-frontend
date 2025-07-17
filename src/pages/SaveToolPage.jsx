import React, { useState, useEffect } from 'react';
import ToolCard from '../components/tool/ToolCard';

const SaveToolPage = () => {
  const [savedTools, setSavedTools] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedTools')) || [];
    setSavedTools(stored);
  }, []);

  const handleToggleFavorite = (tool, isLiked) => {
    if (!isLiked) {
      setSavedTools((prev) => prev.filter((item) => item.name !== tool.name));
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">YOUR SAVED TOOLS</h2>
      {savedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No tools saved yet. Go favorite some!</p>
      )}
    </div>
  );
};
export default SaveToolPage;