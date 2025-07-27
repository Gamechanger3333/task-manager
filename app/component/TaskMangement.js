import React from 'react'

const TaskMangement = () => {
 const [mainTask, setMainTask] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerTasks');
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(mainTask));
  }, [mainTask]);

  const addTask = (title, desc) => {
    if (title.trim() && desc.trim()) {
      setMainTask([...mainTask, { 
        title, 
        desc, 
        id: Date.now(), 
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      return true;
    }
    return false;
  };

  const deleteTask = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setMainTask(updatedTasks);
  };

  const updateTask = (index, title, desc) => {
    if (title.trim() && desc.trim()) {
      const updatedTasks = [...mainTask];
      updatedTasks[index] = { ...updatedTasks[index], title, desc };
      setMainTask(updatedTasks);
      return true;
    }
    return false;
  };

  const clearAllTasks = () => {
    setMainTask([]);
  };

  const completedCount = mainTask.filter(task => task.completed).length;
  const totalTasks = mainTask.length;

  return {
    mainTask,
    addTask,
    deleteTask,
    toggleComplete,
    updateTask,
    clearAllTasks,
    completedCount,
    totalTasks
  };
};




export default TaskMangement