const Header = ({ isDarkMode, toggleTheme, themeClasses, completedCount, totalTasks, onClearAll }) => (
  <div className={`${themeClasses.headerBg} shadow-lg transition-all duration-300`}>
    <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
      <div>
        <h1 className={`text-4xl font-bold ${themeClasses.text}`}>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Task Manager Pro
          </span>
        </h1>
        {totalTasks > 0 && (
          <div className="mt-2">
            <div className={`text-sm ${themeClasses.textSecondary}`}>
              Progress: {completedCount}/{totalTasks} tasks completed
            </div>
            <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {totalTasks > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Clear All
          </button>
        )}
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${themeClasses.cardBg} ${themeClasses.border} border-2 hover:scale-110 transition-all duration-200 shadow-lg`}
        >
          {isDarkMode ? (
            <div className="text-yellow-500">
              <Icons.Sun />
            </div>
          ) : (
            <div className="text-blue-600">
              <Icons.Moon />
            </div>
          )}
        </button>
      </div>
    </div>
  </div>
);
