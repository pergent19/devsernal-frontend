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
      onToggleFavorite(tool, !liked);
    }
  };

  return (
    <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-sm w-full">
      <button
        onClick={toggleHeart}
        className="absolute top-4 right-4 rounded-full p-1"
        aria-label={liked ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={liked ? 'red' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'} transition-colors duration-200 hover:text-red-400`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </button>

      <div className="flex items-center gap-4 mb-3">
        {tool.icon && (
          <img
            src={tool.icon}
            alt={`${tool.name} icon`}
            className="w-10 h-10 object-contain dark:invert"
            onError={(e) => (e.target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@v13.0.0/icons/codepen.svg')}
          />
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{tool.name}</h3>
          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full">
            {tool.category}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{tool.description}</p>
      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-200"
      >
        Learn More
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
};

export default ToolCard;