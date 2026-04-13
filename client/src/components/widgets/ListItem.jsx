export const ListItem = ({ avatar, name, email, badge, action, actionColor = "blue" }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
          {avatar || name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-4">
        {badge && (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
            {badge}
          </span>
        )}
        {action && (
          <button className={`text-sm font-medium text-${actionColor}-600 dark:text-${actionColor}-400 hover:underline`}>
            {action}
          </button>
        )}
      </div>
    </div>
  );
};
