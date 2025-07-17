import { useState, useEffect } from 'react';

const ToolCard = ({ tool, onToggleFavorite }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedTools')) || [];
    setLiked(saved.some((item) => item.name === tool.name));
  }, [tool.name]);

  const toggleHeart = () => {
    const saved = JSON.parse(localStorage.getItem('savedTools')) || [];
    const updated = liked
      ? saved.filter((item) => item.name !== tool.name)
      : [...saved, tool];

    localStorage.setItem('savedTools', JSON.stringify(updated));
    setLiked(!liked);

    if (onToggleFavorite) {
      onToggleFavorite(tool, !liked); // Inform parent
    }
  };

  return (
    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
      <button
        onClick={toggleHeart}
        className="absolute top-4 right-4"
        aria-label="Toggle Favorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={liked ? 'red' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          className={`w-5 h-5 ${liked ? 'text-red-500' : 'text-gray-400'} transition`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        {tool.icon && (
        <img
          src={tool.icon || 'https://cdn.jsdelivr.net/npm/simple-icons@v13.0.0/icons/codepen.svg'}
          alt={`${tool.name} icon`}
          className="w-8 h-8 object-contain dark:invert"
          onError={(e) => (e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v13.0.0/icons/codepen.svg')}
        />
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tool.description}</p>
      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-[#4ed8d5] cursor-pointer"
      >
        Learn More
      </a>
    </div>
  );
};

export default ToolCard;