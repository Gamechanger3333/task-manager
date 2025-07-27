
// Main Task Manager Component
const TaskManager = () => {
  const { isDarkMode, setIsDarkMode, themeClasses } = useTheme();
  const { 
    mainTask, 
    addTask, 
    deleteTask, 
    toggleComplete, 
    updateTask, 
    clearAllTasks, 
    completedCount, 
    totalTasks 
  } = useTasks();
  
  const [showCelebration, setShowCelebration] = useState(false);

  // Celebration logic
  useEffect(() => {
    if (mainTask.length > 0 && mainTask.every(task => task.completed)) {
      triggerCelebration();
    }
  }, [mainTask]);

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const frequencies = [523.25, 659.25, 783.99];
      
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
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    playSound();
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses.bg} relative`}>
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40">
          <CelebrationAnimation />
        </div>
      )}
      
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        themeClasses={themeClasses}
        completedCount={completedCount}
        totalTasks={totalTasks}
        onClearAll={clearAllTasks}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Task Form */}
        <AddTaskForm 
          onAddTask={addTask}
          themeClasses={themeClasses}
        />

        {/* Tasks List */}
        <TaskList 
          tasks={mainTask}
          onToggleComplete={toggleComplete}
          onEdit={updateTask}
          onDelete={deleteTask}
          themeClasses={themeClasses}
          completedCount={completedCount}
          totalTasks={totalTasks}
        />
      </div>
    </div>
  );
};

export default TaskManager;
