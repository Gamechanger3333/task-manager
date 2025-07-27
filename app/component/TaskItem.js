const TaskItem = ({ task, index, onToggleComplete, onEdit, onDelete, themeClasses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.desc);

  const handleSave = () => {
    if (onEdit(index, editTitle, editDesc)) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.desc);
    setIsEditing(false);
  };

  const handleEditTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const editDescInput = document.querySelector('input[placeholder="Task description"]');
      if (editDescInput) editDescInput.focus();
    }
  };

  const handleEditDescKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editTitle.trim() && editDesc.trim()) {
        handleSave();
      }
    }
  };

  return (
    <div className={`${task.completed ? themeClasses.completedTask : themeClasses.taskBg} rounded-xl p-6 border ${themeClasses.border} hover:shadow-md transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
              Edit Title
            </label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={handleEditTitleKeyPress}
              className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input} focus:border-blue-500 focus:outline-none`}
              placeholder="Task title"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
              Edit Description
            </label>
            <input
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              onKeyPress={handleEditDescKeyPress}
              className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input} focus:border-blue-500 focus:outline-none`}
              placeholder="Task description"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Icons.Check />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Icons.X />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
              onClick={() => onToggleComplete(index)}
              className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                task.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : `border-gray-400 hover:border-green-500 ${themeClasses.cardBg}`
              }`}
            >
              {task.completed && <Icons.Check />}
            </button>
            <div className="flex-1">
              <h3 className={`text-xl font-semibold mb-2 ${themeClasses.text} ${task.completed ? 'line-through opacity-60' : ''}`}>
                {task.title}
              </h3>
              <p className={`${themeClasses.textSecondary} ${task.completed ? 'line-through opacity-60' : ''}`}>
                {task.desc}
              </p>
              {task.completed && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  ✅ Completed
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
              title="Edit Task"
              disabled={task.completed}
            >
              <Icons.Edit />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 shadow-lg"
              title="Delete Task"
            >
              <Icons.Trash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default TaskItem