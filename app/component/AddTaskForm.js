const AddTaskForm = ({ onAddTask, themeClasses }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (onAddTask(title, desc)) {
      setTitle("");
      setDesc("");
    }
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const descInput = document.querySelector('input[placeholder="Add some details..."]');
      if (descInput) descInput.focus();
    }
  };

  const handleDescKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (title.trim() && desc.trim()) {
        handleSubmit();
      } else if (!title.trim()) {
        const titleInput = document.querySelector('input[placeholder="What needs to be done?"]');
        if (titleInput) titleInput.focus();
      }
    }
  };

  return (
    <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl p-8 mb-8 border ${themeClasses.border} transition-all duration-300`}>
      <h2 className={`text-2xl font-semibold mb-6 ${themeClasses.text}`}>Add New Task</h2>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleTitleKeyPress}
              className={`w-full px-4 py-3 rounded-xl border-2 ${themeClasses.input} focus:border-blue-500 focus:outline-none transition-all duration-200`}
              type="text"
              placeholder="What needs to be done?"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
              Description
            </label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyPress={handleDescKeyPress}
              className={`w-full px-4 py-3 rounded-xl border-2 ${themeClasses.input} focus:border-blue-500 focus:outline-none transition-all duration-200`}
              type="text"
              placeholder="Add some details..."
            />
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-105"
        >
          <Icons.Plus />
          Add Task
        </button>
      </div>
    </div>
  );
};
 

export default AddTaskForm