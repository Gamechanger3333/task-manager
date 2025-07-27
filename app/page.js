"use client";
import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerTasks');
    const savedTheme = localStorage.getItem('taskManagerTheme');
    
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save tasks to localStorage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(mainTask));
  }, [mainTask]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('taskManagerTheme', isDarkMode ? 'dark' : 'light');
    if (typeof document !== 'undefined') {
      document.body.className = isDarkMode ? 'dark' : '';
    }
  }, [isDarkMode]);

  // Check for celebration when tasks change
  useEffect(() => {
    if (mainTask.length > 0 && mainTask.every(task => task.completed)) {
      triggerCelebration();
    }
  }, [mainTask]);

  const playSound = () => {
    // Create celebration sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create multiple tones for a celebratory chord
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G notes
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + 1 + index * 0.1);
    });
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    playSound();
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const submitHandler = () => {
    if (title.trim() && desc.trim()) {
      setMainTask([...mainTask, { 
        title, 
        desc, 
        id: Date.now(), 
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setTitle("");
      setDesc("");
    }
  };

  // Handle keyboard navigation
  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus on description input
      const descInput = document.querySelector('input[placeholder="Add some details..."]');
      if (descInput) {
        descInput.focus();
      }
    }
  };

  const handleDescKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Add task if both fields have content
      if (title.trim() && desc.trim()) {
        submitHandler();
      } else if (!title.trim()) {
        // Focus back to title if it's empty
        const titleInput = document.querySelector('input[placeholder="What needs to be done?"]');
        if (titleInput) {
          titleInput.focus();
        }
      }
    }
  };

  // Handle keyboard navigation for edit mode
  const handleEditTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus on edit description input
      const editDescInput = document.querySelector('input[placeholder="Task description"]');
      if (editDescInput) {
        editDescInput.focus();
      }
    }
  };

  const handleEditDescKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Save edit if both fields have content
      if (editTitle.trim() && editDesc.trim()) {
        saveEdit();
      }
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setMainTask(updatedTasks);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditTitle(mainTask[index].title);
    setEditDesc(mainTask[index].desc);
  };

  const saveEdit = () => {
    if (editTitle.trim() && editDesc.trim()) {
      const updatedTasks = [...mainTask];
      updatedTasks[editingIndex] = { 
        ...updatedTasks[editingIndex], 
        title: editTitle, 
        desc: editDesc 
      };
      setMainTask(updatedTasks);
      setEditingIndex(-1);
      setEditTitle("");
      setEditDesc("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditTitle("");
    setEditDesc("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const clearAllTasks = () => {
    setMainTask([]);
  };

  const completedCount = mainTask.filter(task => task.completed).length;
  const totalTasks = mainTask.length;

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    input: isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300',
    taskBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    headerBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    completedTask: isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'
  };

  // Custom SVG Icons
  const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );

  const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const SunIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Celebration Animation Component
  const CelebrationAnimation = () => (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">
          Congratulations!
        </h2>
        <p className="text-xl text-white">All tasks completed! 🎊</p>
      </div>
      
      {/* Confetti Animation */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          >
            <div className={`w-2 h-2 rounded-full ${
              ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][
                Math.floor(Math.random() * 5)
              ]
            }`} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses.bg} relative`}>
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40">
          <CelebrationAnimation />
        </div>
      )}
      
      {/* Header */}
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
                onClick={clearAllTasks}
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
                  <SunIcon />
                </div>
              ) : (
                <div className="text-blue-600">
                  <MoonIcon />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Task Form */}
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
              onClick={submitHandler}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <PlusIcon />
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl border ${themeClasses.border} transition-all duration-300`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-2xl font-semibold ${themeClasses.text}`}>
              Your Tasks ({totalTasks})
            </h2>
            {totalTasks > 0 && (
              <p className={`text-sm mt-1 ${themeClasses.textSecondary}`}>
                {completedCount} completed, {totalTasks - completedCount} remaining
              </p>
            )}
          </div>
          
          <div className="p-6">
            {mainTask.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className={`text-xl font-medium mb-2 ${themeClasses.text}`}>No tasks yet</h3>
                <p className={themeClasses.textSecondary}>Add your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mainTask.map((task, index) => (
                  <div
                    key={task.id || index}
                    className={`${task.completed ? themeClasses.completedTask : themeClasses.taskBg} rounded-xl p-6 border ${themeClasses.border} hover:shadow-md transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}
                  >
                    {editingIndex === index ? (
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
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
                          >
                            <CheckIcon />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
                          >
                            <XIcon />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <button
                            onClick={() => toggleComplete(index)}
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                              task.completed 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : `border-gray-400 hover:border-green-500 ${themeClasses.cardBg}`
                            }`}
                          >
                            {task.completed && <CheckIcon />}
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
                            onClick={() => startEdit(index)}
                            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
                            title="Edit Task"
                            disabled={task.completed}
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => deleteHandler(index)}
                            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 shadow-lg"
                            title="Delete Task"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;