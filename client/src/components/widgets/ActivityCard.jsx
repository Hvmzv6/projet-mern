export const ActivityCard = ({ title, description, icon: Icon, timestamp, status = "pending" }) => {
  const statusColors = {
    completed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    in_progress: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    failed: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow">
      <div className="p-2.5 bg-blue-50 dark:bg-gray-700 rounded-lg text-blue-600 dark:text-blue-400 flex-shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {timestamp}
        </p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[status]}`}>
        {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};
