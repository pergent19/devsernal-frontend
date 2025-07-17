import ToolCard from "./ToolCard";

const ToolGrid = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.length > 0 ? (
        tools.map((tool, index) => <ToolCard key={index} tool={tool} />)
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No tools available for this category.</p>
      )}
    </div>
  );
};

export default ToolGrid;    